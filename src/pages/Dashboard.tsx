
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import DocumentCard from "@/components/DocumentCard";
import ChatbotButton from "@/components/ChatbotButton";
import { documents, standards } from "@/data/documents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All Documents");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("ISO 9001:2015");

  // Filter documents based on selected category, search term, and standard
  const filteredDocuments = documents.filter((doc) => {
    const matchesCategory = selectedCategory === "All Documents" || doc.category === selectedCategory;
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.standard.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStandard = doc.standard === selectedStandard;
    
    return matchesCategory && (searchTerm === "" || matchesSearch) && matchesStandard;
  });

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
              Welcome, {user?.name || "User"}
            </h1>
            <p className="text-gray-500">
              Browse all documents shared by the community
            </p>
          </div>
          
          {/* Search */}
          <div className="mb-6 flex items-center gap-2">
            <Input
              placeholder="Search documents, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
            <Button 
              variant="outline"
              onClick={() => setSearchTerm("")}
              className="hidden sm:inline-flex"
            >
              Clear
            </Button>
            <Button 
              className="bg-qms-blue hover:bg-qms-lightBlue text-white md:hidden"
              onClick={() => setSelectedCategory("All Documents")}
            >
              All Documents
            </Button>
          </div>
          
          {/* Document list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.length > 0 ? (
              filteredDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No documents found</p>
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
