
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, X, FileText } from "lucide-react";

interface AnalysisResult {
  overallCompliance: number;
  clauses: Array<{
    id: string;
    title: string;
    compliance: number;
    status: 'pass' | 'fail';
  }>;
}

interface DocumentAnalysisProps {
  uploadedFile: File | null;
  onAnalyze?: () => void;
}

const DocumentAnalysis = ({ uploadedFile, onAnalyze }: DocumentAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    onAnalyze?.();
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisResult({
        overallCompliance: 56,
        clauses: [
          { id: "4.1", title: "Understanding the organization", compliance: 80, status: 'pass' },
          { id: "4.2", title: "Understanding interested parties", compliance: 60, status: 'pass' },
          { id: "4.3", title: "Determining QMS scope", compliance: 90, status: 'pass' },
          { id: "5.1", title: "Leadership and commitment", compliance: 40, status: 'fail' },
        ]
      });
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
              <h4 className="font-semibold mb-3">Clause Analysis:</h4>
              <div className="space-y-2">
                {analysisResult.clauses.map((clause) => (
                  <div 
                    key={clause.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border-l-4 ${
                      clause.status === 'pass' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {clause.status === 'pass' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">
                        Clause {clause.id}: {clause.title}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-gray-900">{clause.compliance}%</span>
                    </div>
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
