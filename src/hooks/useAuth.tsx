
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface User {
  id: string;
  email: string;
  username: string; // Optional, if you want to support username
  fullname: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface TokenPayload {
  jti: string;
  exp: number;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const userData = localStorage.getItem("user");
    console.log("userData", userData);
    console.log("accessToken", accessToken);
    if (accessToken && userData) {
      console.log("userData", userData);
      localStorage.setItem("isLoggedIn", "true");
      const payload: TokenPayload = jwtDecode(accessToken);
      if (payload.exp < Date.now() / 1000) {
        logout(); 
      } else {
        setUser(JSON.parse(userData));
      }
    }
  }, []);


  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password");
      }
      console.log(`${API_BASE_URL}sign-in`);
      console.log(JSON.stringify({ email, password }));
      const response = await fetch(`${API_BASE_URL}sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const accessToken = data.token.accessToken.token;
      const refreshToken = data.token.refreshToken.token;

      // Decode token để lấy thông tin người dùng (hoặc lấy từ backend nếu có)
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const emailFromToken = tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const roleFromToken = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      const getInfo = await fetch(`${API_BASE_URL}api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }
      });

      const userInfoData = await getInfo.json();

      console.log("userInfoData", userInfoData);

      const userInfo: User = {
        id: userInfoData.response.id,
        email: userInfoData.response.email,
        username: userInfoData.response.userName, // Optional, if you want to support username
        fullname: userInfoData.response.fullName,
        role: roleFromToken.toLowerCase() as "user" | "admin"
      };

      console.log("userInfo", userInfo);
      setUser(userInfo);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userInfo));

      toast({
        title: "Success",
        description: "You have successfully logged in",
      });

      if (userInfo.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login",
        variant: "destructive",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch users");
      }
      const usersData: User[] = data.response.map((user: any) => ({
        id: user.id,
        email: user.email,
        username: user.userName, // Optional, if you want to support username
        fullname: user.fullName,
        role: user.role.toLowerCase() as "user" | "admin"
      }));
      setUsers(usersData);
    }
    catch (error: any) {  
      toast({
        title: "Fetch Users Failed",
        description: error.message || "Failed to fetch users",
        variant: "destructive",
      });
    }
  }

  const register = async (fullname: string, email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (!fullname || !email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{6,20}$/;

      if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must be 6–20 characters and include at least one uppercase letter, one lowercase letter, and one special character."
        );
      }

      const response = await fetch(`${API_BASE_URL}sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullname }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Register failed");
      }

      const accessToken = data.token.accessToken.token;
      const refreshToken = data.token.refreshToken.token;

      // Decode token để lấy thông tin người dùng (hoặc lấy từ backend nếu có)
      const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
      const emailFromToken = tokenPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      const roleFromToken = tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      const getInfo = await fetch(`${API_BASE_URL}api/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        }
      });

      const userInfoData = await getInfo.json();

      const userInfo: User = {
        id: userInfoData.response.id,
        email: userInfoData.response.email,
        username: userInfoData.response.userName, // Optional, if you want to support username
        fullname: userInfoData.response.fullName,
        role: roleFromToken.toLowerCase() as "user" | "admin"
      };


      setUser(userInfo);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(userInfo));

      toast({
        title: "Success",
        description: "You have successfully registered",
      });

      if (userInfo.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error: any) {
      toast({
        title: "Register Failed",
        description: error.message || "Failed to register",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setUser(null);
    toast({
      title: "Logged Out",
      description: "You have successfully logged out",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
