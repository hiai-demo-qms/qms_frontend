
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CheckCircle, X, FileText, ChevronDown, ChevronRight } from "lucide-react";

interface AnalysisResult {
  overallCompliance: number;
  categories: Array<{
    id: string;
    title: string;
    compliance: number;
    status: 'pass' | 'fail';
    expanded: boolean;
    items: Array<{
      title: string;
      score: number;
      status: 'pass' | 'fail';
      keywords: string;
    }>;
  }>;
}

interface DocumentAnalysisProps {
  uploadedFile: File | null;
  onAnalyze?: () => void;
}

const DocumentAnalysis = ({ uploadedFile, onAnalyze }: DocumentAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    onAnalyze?.();
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisResult({
        overallCompliance: 56,
        categories: [
          { 
            id: "document-info", 
            title: "Thông tin định danh tài liệu - ĐẠT (6.7/1.0)", 
            compliance: 67, 
            status: 'pass',
            expanded: true,
            items: [
              { title: "Mã số tài liệu", score: 7.98, status: 'pass', keywords: "mã số, code" },
              { title: "Tên tài liệu", score: 8.63, status: 'pass', keywords: "" },
              { title: "Phiên bản", score: 5.92, status: 'pass', keywords: "" },
              { title: "Ngày ban hành", score: 3.35, status: 'pass', keywords: "" },
              { title: "Ngày hiệu lực", score: 5.96, status: 'pass', keywords: "" }
            ]
          },
          { 
            id: "version-management", 
            title: "Quản lý phiên bản - ĐẠT (7.5/1.0)", 
            compliance: 75, 
            status: 'pass',
            expanded: false,
            items: []
          },
          { 
            id: "review-audit", 
            title: "Phần phối và kiểm soát - ĐẠT (6.6/1.0)", 
            compliance: 66, 
            status: 'pass',
            expanded: false,
            items: []
          },
          { 
            id: "content-structure", 
            title: "Nội dung và cấu trúc - ĐẠT (6.3/1.0)", 
            compliance: 63, 
            status: 'pass',
            expanded: false,
            items: []
          },
          { 
            id: "approval-authorization", 
            title: "Phê duyệt và ủy quyền - ĐẠT (7.5/1.0)", 
            compliance: 75, 
            status: 'pass',
            expanded: false,
            items: []
          }
        ]
      });
      setExpandedCategories(new Set(["document-info"]));
      setIsAnalyzing(false);
    }, 2000);
  };

  if (!uploadedFile) return null;

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Document Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* File Selection Status */}
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">File Selected:</p>
            <p className="font-mono text-sm text-gray-700 break-all">{uploadedFile.name}</p>
            <p className="text-sm text-gray-600">Ready for analysis</p>
          </div>
        </div>

        {/* Analyze Button */}
        {!analysisResult && (
          <Button 
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Compliance"}
          </Button>
        )}

        {/* Analysis Results */}
        {analysisResult && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-500 mb-2">
                Overall Compliance: {analysisResult.overallCompliance}%
              </h3>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Category Analysis:</h4>
              <div className="space-y-2">
                {analysisResult.categories.map((category) => (
                  <div key={category.id} className="border rounded-lg">
                    <Collapsible 
                      open={expandedCategories.has(category.id)} 
                      onOpenChange={() => toggleCategory(category.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center gap-3">
                            {expandedCategories.has(category.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="font-medium">{category.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{category.compliance}%</span>
                            {category.status === 'pass' ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {category.items.length > 0 && (
                          <div className="px-4 pb-4">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Tiêu chí</TableHead>
                                  <TableHead>Điểm</TableHead>
                                  <TableHead>Trạng thái</TableHead>
                                  <TableHead>Bắt buộc</TableHead>
                                  <TableHead>Keywords tìm thấy</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {category.items.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.score}</TableCell>
                                    <TableCell>ĐẠT</TableCell>
                                    <TableCell>
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">{item.keywords}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              onClick={() => setAnalysisResult(null)}
              variant="outline"
              className="w-full"
            >
              Analyze Another Document
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentAnalysis;
