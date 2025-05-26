
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
              <CardDescription className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {document.description}
              </CardDescription>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-qms-blue/10 text-qms-blue border border-qms-blue/20">
              {document.standard}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">By {document.authorName}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Category:</span>
              <span className="font-medium text-gray-700 truncate">{document.category}</span>
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
            Last updated: {document.lastUpdated}
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                  <Info className="mr-1.5 h-3.5 w-3.5" />
                  Info
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-3">Document Information</h3>
                  </div>
                  
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Document ID:</span>
                      <span className="text-gray-900 font-mono text-xs">{document.id}</span>
                    </div>
                    <div className="flex justify-between items-start py-1">
                      <span className="font-medium text-gray-600">Title:</span>
                      <span className="text-right max-w-48 text-gray-900 break-words">{document.title}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Category:</span>
                      <span className="text-gray-900">{document.category}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Standard:</span>
                      <span className="text-gray-900">{document.standard}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Version:</span>
                      <span className="text-gray-900">{document.version}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Last Updated:</span>
                      <span className="text-gray-900">{document.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-medium text-gray-600">Author:</span>
                      <span className="text-gray-900">{document.authorName}</span>
                    </div>
                    <div className="flex justify-between items-start py-1">
                      <span className="font-medium text-gray-600">File Path:</span>
                      <span className="text-right max-w-48 text-gray-900 break-all text-xs font-mono">
                        {document.filePath || 'No file'}
                      </span>
                    </div>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
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
              View Document
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
