import { useAuth } from "../context/AuthContext";
import { ReactElement } from "react";
import { Navigate, useLocation,  } from "react-router";
import Loading from "../components/Loading";

interface ProtectedRouteProps {
  children: ReactElement; // Ensure children are valid React elements
}

const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactElement | null => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation(); // To preserve the intended destination


  if (isLoading) {
    return <Loading/>; // Could be replaced with a spinner component
  }

  if (!isAuthenticated) {
    // Redirect to login and preserve the original location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
// export default ProtectedRoute;
