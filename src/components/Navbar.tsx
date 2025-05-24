
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="h-16 border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between bg-white">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <span className="text-qms-blue font-bold text-2xl mr-2">QMS</span>
          <span className="text-qms-darkGray font-medium">Hub</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        {isAuthenticated ? (
          <>
            <Button 
              variant="outline"
              className="hidden md:inline-flex"
              onClick={() => navigate('/dashboard')}
            >
              All Documents
            </Button>
            {!isAdmin && (
              <Button 
                variant="outline"
                className="hidden md:inline-flex"
                onClick={() => navigate('/my-documents')}
              >
                My Documents
              </Button>
            )}
            {isAdmin && (
              <Button 
                variant="outline"
                className="hidden md:inline-flex"
                onClick={() => navigate('/admin')}
              >
                Admin
              </Button>
            )}
            <Button
              variant="outline"
              className="hidden md:inline-flex"
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <div className="hidden md:flex items-center text-sm text-gray-600 mr-2">
              Welcome, {user?.name}
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              className="text-qms-darkGray hover:text-qms-blue"
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="text-qms-blue border-qms-blue hover:bg-qms-blue hover:text-white"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-qms-blue hover:bg-qms-lightBlue text-white"
            >
              Register
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
