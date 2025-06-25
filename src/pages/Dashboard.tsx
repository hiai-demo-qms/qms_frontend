
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarks } from "@/hooks/useBookmarks";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import DocumentCard from "@/components/DocumentCard";
import ChatbotButton from "@/components/ChatbotButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCategories, type Category } from "@/hooks/useCategories"; 
import { useDocuments } from "@/hooks/useDocuments";
import type { Document } from "@/hooks/useDocuments";

const Dashboard = () => {
  const { user } = useAuth();
  const { categories } = useCategories(); // Assuming this hook provides the categories
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.categoryName || "All Documents");
  const [searchTerm, setSearchTerm] = useState("");
  const { documents, bookmarkedDocuments, getBookmarkedDocuments, setBookmarkedDocument, fetchDocuments } = useDocuments();

  console.log("Bookmarked Documents:", bookmarkedDocuments);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  useEffect(() => {
    getBookmarkedDocuments();
    fetchDocuments();
  }, []);

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    let docsToFilter = selectedCategory === "Bookmarked Documents" 
      ? bookmarkedDocuments
      : selectedCategory === "All Documents"
        ? documents
        : documents.filter(doc => doc.category.categoryName === selectedCategory);

    const filtered = docsToFilter.filter(doc =>
      doc.title.toLowerCase().includes(lowerSearch) ||
      doc.description.toLowerCase().includes(lowerSearch) ||
      doc.user.fullName.toLowerCase().includes(lowerSearch)
    );

    setFilteredDocuments(filtered);
  }, [searchTerm, selectedCategory, bookmarkedDocuments, documents]);

  // const filteredDocuments = selectedCategory === "Bookmarked Documents"
  //   ? bookmarkedDocuments.filter((doc) => {
  //       const matchesSearch =
  //         doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         doc.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());

  //       return searchTerm === "" || matchesSearch;
  //     })
  //   : documents.filter((doc) => {
  //       const matchesSearch =
  //         doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         doc.user.fullName.toLowerCase().includes(searchTerm.toLowerCase());

  //       // Nếu đang chọn "Tất cả tài liệu"
  //       if (selectedCategory === "All Documents") {
  //         return searchTerm === "" || matchesSearch;
  //       }

  //       // Lọc theo danh mục cụ thể
  //       return (
  //         doc.category.categoryName === selectedCategory &&
  //         (searchTerm === "" || matchesSearch)
  //       );
  //     });


  const handleBookmarkChange = async () => {
    await getBookmarkedDocuments(); // Gọi lại API để cập nhật danh sách
  };
  const getDisplayTitle = () => {
    if (selectedCategory === "Bookmarked Documents") {
      return "Tài liệu đã lưu";
    }
    return selectedCategory === "All Documents" ? "Tất cả tài liệu" : selectedCategory;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        
        {/* Main content */}
        <div className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">
              Chào mừng, {user?.fullname || "Người dùng"}
            </h1>
            <p className="text-gray-500">
              {selectedCategory === "Bookmarked Documents" 
                ? "Tài liệu bạn đã lưu"
                : "Duyệt tất cả tài liệu được chia sẻ bởi cộng đồng"
              }
            </p>
          </div>
          
          {/* Search */}
          <div className="mb-6 flex items-center gap-2">
            <Input
              placeholder="Tìm kiếm tài liệu, tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button 
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="hidden sm:inline-flex"
            >
              Xóa
            </Button>
            <Button 
              className="bg-qms-blue hover:bg-qms-lightBlue text-white md:hidden"
              onClick={() => setSelectedCategory("All Documents")}
            >
              Tất cả tài liệu
            </Button>
          </div>
          
          {/* Document list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} onBookmarkChange={handleBookmarkChange}/>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">
                  {selectedCategory === "Bookmarked Documents" 
                    ? "Không tìm thấy tài liệu đã lưu"
                    : "Không tìm thấy tài liệu"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Chatbot button */}
      <ChatbotButton />
    </div>
  );
};

export default Dashboard;
