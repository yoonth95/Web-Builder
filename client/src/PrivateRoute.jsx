import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return user ? children : <Navigate to='/' state={{ from: location }} />;
};

export default PrivateRoute;
