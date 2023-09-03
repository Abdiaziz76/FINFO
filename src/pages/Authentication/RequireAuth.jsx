import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // console.log("auth", auth)
  // let v =   auth.roles.find(role=> allowedRoles?.includes(role))

  return auth.roles &&
    auth.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
