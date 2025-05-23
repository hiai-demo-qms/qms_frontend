
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { Document } from "@/data/documents";

interface DocumentCardProps {
  document: Document;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const handleViewDocument = () => {
    // Mở file PDF trong tab mới
    if (document.filePath) {
      window.open(document.filePath, '_blank');
    } else {
      // Fallback nếu không có filePath, vẫn chuyển đến trang chi tiết
      window.location.href = `/document/${document.id}`;
    }
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start">
            <FileText className="mr-2 h-5 w-5 text-qms-blue mt-0.5" />
            <div>
              <CardTitle className="text-lg font-medium">{document.title}</CardTitle>
              <CardDescription className="text-sm mt-1">{document.description}</CardDescription>
            </div>
          </div>
          <div className="px-2 py-1 bg-qms-gray rounded-md text-xs font-medium">
            {document.standard}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div>Category: {document.category}</div>
          <div>Version: {document.version}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-gray-500">
          Last updated: {document.lastUpdated}
        </div>
        <Button variant="outline" size="sm" onClick={handleViewDocument}>
          View Document
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
