import { createContext, useContext, useState, ReactNode } from "react";
import api from "../api/api";
import { useNavigate } from "react-router";

// Define the shape of the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check for token in cookies or localStorage on initial load
    return !!document.cookie.includes("accessToken");
  });

  const navigate = useNavigate();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      // Send login request to server

      const response = await api.post("/auth/login", credentials, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true); // Set authenticated state
        // Redirect user after successful login
        navigate("about"); // Replace "/dashboard" with your desired route
      }
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };
  const logout = () => {
    // Clear session on server
    api
      .post("/auth/logout", {}, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(false);
      })
      .catch((error) => console.error("Logout failed", error));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
