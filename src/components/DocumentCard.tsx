
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { FileText, User, Info } from "lucide-react";
import type { Document } from "@/data/documents";

interface DocumentCardProps {
  document: Document;
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const handleViewDocument = () => {
    if (document.filePath) {
      window.open(document.filePath, '_blank');
    } else {
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
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <User className="mr-1 h-4 w-4" />
          <span>By {document.authorName}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div>Category: {document.category}</div>
          <div>Version: {document.version}</div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-gray-500">
          Last updated: {document.lastUpdated}
        </div>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Info className="mr-2 h-4 w-4" />
                Document Info
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Document Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Document ID:</span>
                    <span>{document.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Title:</span>
                    <span className="text-right max-w-48 truncate">{document.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Category:</span>
                    <span>{document.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Standard:</span>
                    <span>{document.standard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Version:</span>
                    <span>{document.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Last Updated:</span>
                    <span>{document.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Author:</span>
                    <span>{document.authorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">File Path:</span>
                    <span className="text-right max-w-48 truncate">{document.filePath || 'No file'}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{document.description}</p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm" onClick={handleViewDocument}>
            View Document
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
