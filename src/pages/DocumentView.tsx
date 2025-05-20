
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { documents } from "@/data/documents";
import { ArrowLeft, FileText, Download, Printer, Share2 } from "lucide-react";

const DocumentView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [document, setDocument] = useState<typeof documents[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading the document
    const timer = setTimeout(() => {
      const foundDocument = documents.find(doc => doc.id === id);
      setDocument(foundDocument || null);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Progress className="w-64 h-2 mb-4" value={75} />
            <p className="text-gray-500">Loading document...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow p-6">
          <Link to="/dashboard">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6 pb-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Document Not Found</h2>
              <p className="text-gray-500 mb-6">
                The requested document could not be found or you don't have permission to access it.
              </p>
              <Button onClick={() => window.history.back()}>Go Back</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow p-6">
        <Link to="/dashboard">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <FileText className="mr-3 h-6 w-6 text-qms-blue mt-1" />
                  <div>
                    <CardTitle className="text-2xl">{document.title}</CardTitle>
                    <p className="text-sm text-gray-500 mt-2">
                      Category: {document.category} • Version: {document.version} • Updated: {document.lastUpdated}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-qms-gray rounded-md text-sm font-medium">
                  {document.standard}
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Document Contents</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              <div className="prose max-w-none">
                <p className="mb-4">
                  {document.description}
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">1. Purpose and Scope</h3>
                <p className="mb-4">
                  This {document.title.toLowerCase()} provides guidance for implementing and maintaining 
                  {document.category.toLowerCase() === 'quality management' 
                    ? ' the organization\'s quality management system' 
                    : ` the organization's ${document.category.toLowerCase()} processes`} 
                  in compliance with ISO 9001:2015 requirements.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">2. Normative References</h3>
                <p className="mb-4">
                  ISO 9001:2015 - Quality Management Systems - Requirements
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">3. Terms and Definitions</h3>
                <p className="mb-4">
                  For the purposes of this document, the terms and definitions given in ISO 9000:2015 apply.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">4. Document Content</h3>
                <p className="mb-4">
                  This is placeholder content for the {document.title}. In a real QMS system, this would contain 
                  the actual document content, procedures, and requirements specific to {document.category}.
                </p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">5. Associated Records</h3>
                <ul className="list-disc pl-5 mb-4">
                  <li>Quality Records</li>
                  <li>Process Documentation</li>
                  <li>Work Instructions</li>
                  <li>Forms and Templates</li>
                </ul>
                
                <h3 className="text-lg font-medium mt-6 mb-3">6. Document Control Information</h3>
                <table className="w-full mb-4 border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Document ID:</td>
                      <td className="py-2">{document.id}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Version:</td>
                      <td className="py-2">{document.version}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Last Updated:</td>
                      <td className="py-2">{document.lastUpdated}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Next Review Date:</td>
                      <td className="py-2">
                        {new Date(new Date(document.lastUpdated).setFullYear(new Date(document.lastUpdated).getFullYear() + 1)).toISOString().split('T')[0]}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium">Approved By:</td>
                      <td className="py-2">Quality Manager</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentView;
