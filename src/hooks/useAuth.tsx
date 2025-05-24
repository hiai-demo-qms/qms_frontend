
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { users } from "@/data/documents";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const foundUser = users.find(u => u.id === storedUserId);
      if (foundUser) {
        setUser({
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        });
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email === "" || password === "") {
        throw new Error("Please enter both email and password");
      }

      // Find user by email
      const foundUser = users.find(u => u.email === email);
      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      const loggedInUser = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      };

      setUser(loggedInUser);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", foundUser.id);
      
      toast({
        title: "Success",
        description: "You have successfully logged in",
      });
      
      // Redirect based on role
      if (foundUser.role === 'admin') {
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

  const register = async (name: string, email: string, password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (!name || !email || !password) {
        throw new Error("Please fill in all fields");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Check if email already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new Error("Email already exists");
      }

      const newUser = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'user' as const
      };

      setUser(newUser);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", newUser.id);
      
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
    localStorage.removeItem("userId");
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
