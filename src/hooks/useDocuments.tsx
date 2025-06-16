import { useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Category {
  id: number;
  categoryName: string;
  description: string;
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

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
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

    fetchDocuments();
  }, []);

  // const analyzeDocument = async (file: File) => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const res = await fetch(`${API_BASE_URL}api/document/${documentId}/analyze`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     const data = await res.json();

  //     if (res.ok && data.response) {
  //       // Handle successful analysis response
  //       console.log("Analysis result:", data.response);
  //     } else {
  //       setError(data.message || "Không thể phân tích tài liệu.");
  //     }
  //   } catch (err) {
  //     setError("Lỗi khi phân tích tài liệu.");
  //   } finally {
  //     setLoading(false);
  //   }
  // }

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

  return {
    documents,
    loading,
    error,
    deleteDocument,
    uploadDocument,
    updateDocument,
    getDocumentUrl,
    fetchDocumentsByUser,
    fetchDocumentsByCategory,
  };
};
