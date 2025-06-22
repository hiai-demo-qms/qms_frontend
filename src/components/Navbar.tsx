
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
              Tất cả tài liệu
            </Button>
            {!isAdmin && (
              <Button 
                variant="outline"
                className="hidden md:inline-flex"
                onClick={() => navigate('/my-documents')}
              >
                Tài liệu của tôi
              </Button>
            )}
            {isAdmin && (
              <Button 
                variant="outline"
                className="hidden md:inline-flex"
                onClick={() => navigate('/admin')}
              >
                Quản trị
              </Button>
            )}
            <Button
              variant="outline"
              className="hidden md:inline-flex"
              onClick={() => navigate('/profile')}
            >
              <User className="h-4 w-4 mr-2" />
              Hồ sơ
            </Button>
            <div className="hidden md:flex items-center text-sm text-gray-600 mr-2">
              Chào mừng, {user?.fullname}
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              className="text-qms-darkGray hover:text-qms-blue"
            >
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="text-qms-blue border-qms-blue hover:bg-qms-blue hover:text-white"
            >
              Đăng nhập
            </Button>
            <Button
              onClick={() => navigate('/register')}
              className="bg-qms-blue hover:bg-qms-lightBlue text-white"
            >
              Đăng ký
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
