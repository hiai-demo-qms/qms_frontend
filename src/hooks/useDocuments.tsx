import { useQueries } from "@tanstack/react-query";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Category {
  id: number;
  categoryName: string;
  description: string;
}

export interface AnalyzeResult {
  analyzeResponseId: number;
  score: number;
  status: 'Đạt' | 'Không đạt';
  clause_Results: Array<{
    title: string;
    score: number;
    status: 'Đạt' | 'Không đạt';
    keywords: string;
  }>;
}

export interface Document {
    id: number;
    code: string;
    title: string;
    description: string;
    categoryId: number;
    userId: string;
    version: string;
    uploadedAt: string;
    updatedAt: string;
    fileName: string;
    filePath: string;
    user: {
        fullName: string;
        email: string;
    };
    category: {
        id: number;
        categoryName: string;
    };
}

interface DocumentsContextType {
    documents: Document[];
    bookmarkedDocuments: Document[];
    loading: boolean;
    error: string | null;
    isBookmarked: boolean;
    setIsBookmarked: (isBookmarked: boolean) => void;
    getDocument: (documentId: number) => Promise<Document | null>;
    getDocUrl: (documentId: number) => Promise<string | null>;
    analyzeDocument: (file: File) => Promise<AnalyzeResult | null>;
    deleteDocument: (documentId: number) => Promise<void>;
    uploadDocument: (formDataToSend: FormData) => Promise<Response>;
    updateDocument: (documentId: number, formDataToSend: FormData) => Promise<Response>;
    getBookmarkedDocuments: () => Promise<void>;
    setBookmarkedDocument: (documentId: number, isBookmarked: boolean) => Promise<void>;
    checkIsBookmarked: (documentId: number) => boolean;
    getDocumentUrl: (documentId: number) => Promise<string | null>;
    fetchDocuments: () => Promise<void>;
    fetchDocumentsByUser: () => Promise<void>;
    fetchDocumentsByCategory: (categoryId: number) => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

export const DocumentsProvider = ({ children }: { children: React.ReactNode }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [bookmarkedDocuments, setBookmarkedDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    // getBookmarkedDocuments();
    // fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}api/document`);

      const data = await res.json();
      console.log("Documents:", data);
      if (res.ok && data.response) {
        setDocuments(data.response);
      } else {
        setError(data.message || "Không thể tải tài liệu.");
      }
    } catch (err) {
      setError("Lỗi khi tải tài liệu.");
    } finally {
      setLoading(false);
    }
  };

  const analyzeDocument = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE_URL}api/chatbot/analyze`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      console.log("Analyze response:", res);

      const data = await res.json();

      if (res.ok) {
        if (!data) {
          console.error("Phân tích thất bại: Không có data trong response");
          return;
        }
        if (!data.analyzeResponseId) {
          console.error("Phân tích thất bại: Không có analyzeResponseId trong response");
          return;
        }
        console.log("Analysis result:", data);
        return data; // Trả về kết quả phân tích
        // setAnalysisResult(data); // nếu bạn muốn lưu kết quả
      } else {
        setError(data.message || "Không thể phân tích tài liệu.");
      }
    } catch (err) {
      console.error(err);
      setError("Lỗi khi phân tích tài liệu.");
    } finally {
      setLoading(false);
    }
  }
  const getDocumentUrl = async (documentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}api/document/${documentId}/download`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.response) {
        window.open(data.response, '_blank');
      } else {
        alert(data.message || "Không thể mở tài liệu.");
      }
      setError(data.message || "Không thể tải tài liệu.");
    } catch (err) {
      setError("Lỗi khi tải tài liệu.");
    }
    return null; // Trả về null nếu có lỗi
  }
  const getDocUrl = async (documentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}api/document/${documentId}/download`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.response) {
        return data.response;
      }
    } catch (err) {
      setError("Lỗi khi tải tài liệu.");
    }
    return null; // Trả về null nếu có lỗi
  }
  const deleteDocument = async (documentId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}api/document/${documentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
      } else {
        setError(data.message || "Không thể xóa tài liệu.");
      }
    } catch (err) {
      setError("Lỗi khi xóa tài liệu.");
    } finally {
      setLoading(false);
    }
  }

  const uploadDocument = async (formDataToSend: FormData) => {
    try {
      console.log("Uploading document with formData:", formDataToSend);
      const res = await fetch(`${API_BASE_URL}api/document`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        console.log("Upload thành công:", result);
        alert("Tải tài liệu lên thành công!");
      } else {
        console.error("Lỗi upload:", result.message);
        alert("Lỗi khi tải tài liệu lên: " + result.message);
      }
      return res;
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      alert("Đã xảy ra lỗi khi gửi tài liệu.");
    }
  }

  const getBookmarkedDocuments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}api/document/bookmarked`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();
      console.log("Bookmarked documents:", data);

      if (res.ok && data.response) {
        setBookmarkedDocuments(data.response);
      } else {
        setError(data.message || "Không thể tải tài liệu đã lưu.");
      }
    } catch (err) {
      setError("Lỗi khi tải tài liệu đã lưu.");
    } finally {
      setLoading(false);
    }
    return null; // Trả về null nếu có lỗi
  }

  const setBookmarkedDocument = async (documentId: number, isBookmarked: boolean) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Setting bookmark for document ID:", documentId, "Is bookmarked:", isBookmarked);
      const res = await fetch(`${API_BASE_URL}api/document/bookmark/${documentId}`, {
        method: isBookmarked ? "DELETE" : "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },  
      });
      const data = await res.json();
      if (res.ok) {
        // if (isBookmarked) {
        //   setBookmarkedDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
        // } else {
        //   setBookmarkedDocuments((prev) => [...prev, data.response]);
        // }
        await getBookmarkedDocuments(); // Cập nhật lại danh sách tài liệu đã lưu
      } else {
        setError(data.message || "Không thể cập nhật tài liệu đã lưu.");
      }
    } catch (err) {
      setError("Lỗi khi cập nhật tài liệu đã lưu.");
    }
    finally {
      setLoading(false);
    }
  }

  const checkIsBookmarked = (documentId: number) => {
    return bookmarkedDocuments.some((doc) => doc.id === documentId);
  };

  const getDocument = async (documentId: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}api/document/${documentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (res.ok && data.response) {
        return data.response;
      }
    } catch (err) {
      setError("Lỗi khi tải tài liệu.");
    }
    return null; // Trả về null nếu có lỗi
  }

  const updateDocument = async (documentId: number, formDataToSend: FormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}api/document/${documentId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok && data.response) {
        setDocuments((prev) =>
          prev.map((doc) => (doc.id === documentId ? { ...doc, ...data } : doc))
        );
      } else {
        setError(data.message || "Không thể cập nhật tài liệu.");
      }
      setLoading(false);
      return res;
    } catch (err) {
      setError("Lỗi khi cập nhật tài liệu.");
    }
  };

  const fetchDocumentsByUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}api/document/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.response) {
        setDocuments(data.response);
      } else {
        setError(data.message || "Không thể tải tài liệu theo user.");
      }
    } catch (err) {
      setError("Lỗi khi tải tài liệu theo user.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDocumentsByCategory = async (categoryId: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}api/document/category?categoryId=${categoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      console.log("Documents by category:", data);
      if (res.ok && data.response) {
        setDocuments(data.response);
      } else {
        setError(data.message || "Không thể tải tài liệu theo danh mục.");
      }
    } catch (err) {
      setError("Lỗi khi tải tài liệu theo danh mục.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: DocumentsContextType = {
    documents,
    bookmarkedDocuments,
    loading,
    error,
    isBookmarked,
    setIsBookmarked,
    getDocument,
    getDocUrl,
    analyzeDocument,
    deleteDocument,
    uploadDocument,
    updateDocument,
    getBookmarkedDocuments,
    setBookmarkedDocument,
    checkIsBookmarked,
    getDocumentUrl,
    fetchDocuments,
    fetchDocumentsByUser,
    fetchDocumentsByCategory,
  };

  return (
    <DocumentsContext.Provider value={contextValue}>
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error("useDocuments must be used within a DocumentsProvider");
  }
  return context;
};
