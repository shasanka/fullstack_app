import { useAuth } from "../context/AuthContext";
import { ReactElement } from "react";
import { Navigate,  } from "react-router";

interface ProtectedRouteProps {
  children: ReactElement; // Ensure children are valid React elements
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement | null => {
  const { isAuthenticated } = useAuth();
  console.log("🚀 ~ isAuthenticated:", isAuthenticated)

  if (!isAuthenticated) {
    // Perform programmatic navigation
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
