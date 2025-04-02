import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import api from "../api/api";
import { useNavigate } from "react-router";

// Define the shape of the AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true); // Track initial load

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log("Checking auth status...");
      try {
        const response = await api.get("/dashboard");
        // console.log("Dashboard response:", response.status, response.data);
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        // console.error("Auth check failed:", err);
        setIsAuthenticated(false);
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    try {
      console.log("Attempting login...");
      const response = await api.post("/auth/login", credentials);
      console.log("Login response:", response.status, response.data);
      if (response.status === 200) {
        setIsAuthenticated(true);
        setIsLoading(false); // Ensure loading is false after login
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setIsLoading(false); // Ensure loading is false even on failure
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsAuthenticated(false);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };
  const values = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      isLoading,
    }),
    [isAuthenticated, isLoading]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
