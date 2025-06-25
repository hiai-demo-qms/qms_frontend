import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  CheckCircle,
  X,
  FileText,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { useDocuments, AnalyzeResult } from "@/hooks/useDocuments";

interface DocumentAnalysisProps {
  uploadedFile: File | null;
  onAnalyze?: () => void;
  onAnalyzeResult?: (id: number) => void;
}

const DocumentAnalysis = ({ uploadedFile, onAnalyze, onAnalyzeResult }: DocumentAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeResponseId, setAnalyzeResponseId] = useState<number | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResult | null>(null);
  const [expanded, setExpanded] = useState<boolean>(true);
  const { analyzeDocument } = useDocuments();

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    onAnalyze?.();

    try {
      const data = await analyzeDocument(uploadedFile);
      onAnalyzeResult?.(data.analyzeResponseId);
      const transformed: AnalyzeResult = {
        analyzeResponseId: data.analyzeResponseId,
        score: Math.round(data.score),
        status: data.score >= 60 ? "Đạt" : "Không đạt",
        clause_Results: data.clause_Results.map((clause: any) => ({
          title: clause.title,
          score: clause.score,
          status: clause.status,
          keywords: clause.evidences?.join(", ") || "",
        })),
      };

      setAnalysisResult(transformed);
    } catch (err) {
      alert("Phân tích thất bại: " + (err as Error).message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!uploadedFile) return null;

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Phân tích tài liệu
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
            <p className="font-semibold text-gray-900">Tệp đã chọn:</p>
            <p className="font-mono text-sm text-gray-700 break-all">{uploadedFile.name}</p>
            <p className="text-sm text-gray-600">Sẵn sàng để phân tích</p>
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
                Tổng hợp tuân thủ: {analysisResult.score}%
              </h3>
              <p className={`text-lg font-semibold ${analysisResult.status === "Đạt" ? "text-green-600" : "text-red-600"}`}>
                {analysisResult.status}
              </p>
            </div>

            <Collapsible open={expanded} onOpenChange={() => setExpanded(!expanded)}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    {expanded ? <ChevronDown /> : <ChevronRight />}
                    <span className="font-medium">Chi tiết tiêu chí</span>
                  </div>
                  <div className="text-sm text-gray-500">{analysisResult.clause_Results.length} tiêu chí</div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="px-4 pb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tiêu chí</TableHead>
                        <TableHead>Điểm</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Dẫn chứng</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analysisResult.clause_Results.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>{item.score}</TableCell>
                          <TableCell className={item.status === "Đạt" ? "text-green-600" : "text-red-600"}>
                            {item.status}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{item.keywords}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button
              onClick={() => setAnalysisResult(null)}
              variant="outline"
              className="w-full"
            >
              Đánh giá lại
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentAnalysis;
