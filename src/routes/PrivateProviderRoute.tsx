import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateProviderRouteProps {
  children: ReactNode;
}

const PrivateProviderRoute = ({ children } : PrivateProviderRouteProps) => {
  const { authenProvider } = useContext(AuthContext); 
  return authenProvider ? (
    <>{children}</>
  ) : (
    <Navigate to="/provider/login-provider" replace />
  );
};

export default PrivateProviderRoute;
