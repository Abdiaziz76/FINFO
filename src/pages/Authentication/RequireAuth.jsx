import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log("auth", auth.roles);
  const isAuthorized = auth?.roles && auth?.roles.find(role => allowedRoles?.includes(role));
  console.log("isAuthorized", isAuthorized);

  return isAuthorized ? <Outlet /> : <Navigate to="/signin" state={{ from: location }} replace />;
};

export default RequireAuth;
