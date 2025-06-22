import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDocuments } from "@/hooks/useDocuments";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { FileText, ArrowLeft, Download, Printer, Share2 } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { ArrowUp } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const DocumentView = () => {
  const { id } = useParams();
  const { documents, loading, getDocumentUrl, getDocUrl, getDocument } = useDocuments();
  const [document, setDocument] = useState<typeof documents[0] | null>(null);
  const [docUrl, setDocUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const fetchDocument = async () => {
      if (id) {
        const doc = await getDocument(Number(id));
        if (doc) {
          setDocument(doc);
        } else {
          setDocument(null);
        }
      }
    };
    const fetchUrl = async () => {
      const url = await getDocUrl(document.id);
      if (url) setDocUrl(url);
    };
    fetchDocument();
    if (document) {
      fetchUrl();
    }
    if (containerRef.current) {
      setPageWidth(containerRef.current.offsetWidth - 32); // trừ padding nếu có
    }
  }, [document]);



  // if (loading || !documents.length) {
  //   console.log(document);
  //   return (
  //     <div className="min-h-screen flex flex-col bg-gray-50">
  //       <Navbar />
  //       <div className="flex-grow flex items-center justify-center">
  //         <div className="text-center">
  //           <Progress className="w-64 h-2 mb-4" value={75} />
  //           <p className="text-gray-500">Loading document...</p>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
                      Category: {document.category?.categoryName} • Version: {document.version} • Updated: {document.updatedAt}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 bg-qms-gray rounded-md text-sm font-medium">
                  ISO 9001:2015
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Document Contents</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => getDocumentUrl(document.id)}>
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

              <div ref={containerRef} className="prose max-w-4xl mx-auto p-4 bg-white rounded-lg shadow">
                <Document file={docUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from({ length: numPages }, (_, i) => (
                    <div key={i} className="my-6 flex justify-center">
                      <Page
                        pageNumber={i + 1}
                        width={pageWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="rounded shadow"
                      />
                    </div>
                  ))}
                </Document>
              </div>

            </CardContent>
          </Card>

          <Button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
            title="Về đầu trang"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>

        </div>
      </div>
    </div>
  );
};

export default DocumentView;
