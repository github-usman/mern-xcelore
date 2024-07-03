
import useAuth from './useAuth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
