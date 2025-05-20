
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // In a real app, this would connect to a backend for authentication
  const login = async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation
      if (email === "" || password === "") {
        throw new Error("Please enter both email and password");
      }

      // Mock successful login
      setUser({
        id: "1",
        email,
        name: email.split("@")[0],
      });
      
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Failed to login",
        variant: "destructive",
      });
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!name || !email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Mock successful registration
      setUser({
        id: "1",
        email,
        name,
      });
      
      localStorage.setItem("isLoggedIn", "true");
      toast({
        title: "Success",
        description: "Account created successfully",
      });
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("isLoggedIn");
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
