import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const authToken = localStorage.getItem('authToken');

  // If the user has a token, render the children. Otherwise, redirect to the login page.
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;