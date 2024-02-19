import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateAdminRoute = ({ children } : PrivateRouteProps) => {
  const { authenticated, role } = useContext(AuthContext);
  return authenticated && role ? (
    <>{children}</>
  ) : (
    <Navigate to="/error-404" replace />
  );
};

export default PrivateAdminRoute;
