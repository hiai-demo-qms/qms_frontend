
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { DocumentsProvider, useDocuments } from "./hooks/useDocuments";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyDocuments from "./pages/MyDocuments";
import DocumentView from "./pages/DocumentView";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route wrapper component
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <>{element}</> : <Navigate to="/login" />;
};

// Admin route wrapper component
const AdminRoute = ({ element }: { element: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{element}</>;
};

// Main App wrapper that includes providers
const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard" 
        element={<ProtectedRoute element={<Dashboard />} />} 
      />
      <Route 
        path="/my-documents" 
        element={<ProtectedRoute element={<MyDocuments />} />} 
      />
      <Route 
        path="/profile" 
        element={<ProtectedRoute element={<Profile />} />} 
      />
      <Route 
        path="/admin" 
        element={<AdminRoute element={<Admin />} />} 
      />
      <Route 
        path="/document/:id" 
        element={<ProtectedRoute element={<DocumentView />} />} 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <DocumentsProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </DocumentsProvider>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
