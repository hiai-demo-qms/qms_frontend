
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Info, Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { Document } from "@/hooks/useDocuments";
import dayjs from "dayjs";

interface DocumentCardProps {
  document: Document;
}
const accessToken = localStorage.getItem("accessToken"); // Lấy access token từ localStorage nếu cần
const DocumentCard = ({ document }: DocumentCardProps) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const handleViewDocument = async () => {
    try {
      const res = await fetch(`https://localhost:7147/api/document/${document.id}/download`);

      const data = await res.json();

      if (res.ok && data.response) {
        window.open(data.response, '_blank');
      } else {
        alert(data.message || "Không thể mở tài liệu.");
      }
    } catch (error) {
      console.error("Lỗi khi mở tài liệu:", error);
      alert("Có lỗi xảy ra khi mở tài liệu.");
    }
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(document.id);
    console.log("Bookmark: ", localStorage.getItem('bookmarkedDocuments'));
  };

  return (
    <Card className="w-full h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-md hover:border-gray-200 bg-white">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex justify-between items-start gap-3">
          <div className="flex items-start gap-3 min-w-0 flex-1">
            <div className="mt-1 flex-shrink-0">
              <FileText className="h-5 w-5 text-qms-blue" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight mb-2">
                {document.title}
              </CardTitle>
              {/* <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {document.description}
              </CardDescription> */}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkToggle}
              className={`h-8 w-8 p-0 hover:bg-yellow-50 ${isBookmarked(document.id) ? 'text-yellow-600' : 'text-gray-400'}`}
            >
              <Bookmark 
                className={`h-4 w-4 ${isBookmarked(document.id) ? 'fill-current' : ''}`} 
              />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{document.user.fullName}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Danh mục:</span>
              <span className="font-medium text-gray-700 truncate">{document.category.categoryName}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-gray-500">v</span>
              <span className="font-medium text-gray-700">{document.version}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 flex-shrink-0 border-t border-gray-100">
        <div className="w-full space-y-3">
          <div className="text-xs text-gray-500">
            Cập nhật lần cuối: {dayjs(document.updatedAt).format("DD/MM/YYYY HH:mm")}
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                  <Info className="mr-1.5 h-3.5 w-3.5" />
                  Thông tin
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Thông tin tài liệu</h3>
                  </div>
                  
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Mã tài liệu:</span>
                      <span className="text-gray-900 font-mono text-xs">{document.code}</span>
                    </div>
                    <div className="flex justify-between items-start py-1">
                      <span className="font-medium text-gray-600">Tiêu đề:</span>
                      <span className="text-right max-w-48 text-gray-900 break-words">{document.title}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Danh mục:</span>
                      <span className="text-gray-900">{document.category.categoryName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Phiên bản:</span>
                      <span className="text-gray-900">{document.version}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Cập nhật lần cuối:</span>
                      <span className="text-gray-900">{dayjs(document.updatedAt).format("DD/MM/YYYY HH:mm")}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Người đăng:</span>
                      <span className="text-gray-900">{document.user.fullName}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Mô tả</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{document.description}</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleViewDocument}
              className="flex-1 text-xs h-8 bg-qms-blue hover:bg-qms-lightBlue"
            >
              Xem tài liệu
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
