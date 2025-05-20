
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ChatbotButton from "@/components/ChatbotButton";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-white py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 md:text-5xl">
                ISO Document Management System
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Streamline your quality management process with our comprehensive document
                management system designed for ISO standards compliance.
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-qms-blue hover:bg-qms-lightBlue text-white px-8 py-6"
                  size="lg"
                >
                  Get Started
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  className="px-8 py-6"
                  size="lg"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">ISO Document Management</h3>
                <p className="text-gray-600">
                  Organize and manage all your ISO documentation in one centralized system.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Version Control</h3>
                <p className="text-gray-600">
                  Track document versions and changes with comprehensive history.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">AI Assistant</h3>
                <p className="text-gray-600">
                  Get instant help with your ISO documentation questions using our chatbot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ISO Standards section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Supporting Multiple ISO Standards
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <h3 className="text-xl font-semibold mb-3">ISO 9001:2015</h3>
                <p className="text-gray-600">
                  Quality Management System
                </p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <h3 className="text-xl font-semibold mb-3">ISO 14001:2015</h3>
                <p className="text-gray-600">
                  Environmental Management System
                </p>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 text-center">
                <h3 className="text-xl font-semibold mb-3">ISO 27001:2013</h3>
                <p className="text-gray-600">
                  Information Security Management
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2025 QMS Hub. All rights reserved.</p>
        </div>
      </footer>
      
      <ChatbotButton />
    </div>
  );
};

export default Index;
