import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const RequireAuth = () => {
  const token = sessionStorage.getItem("token");
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  if (token && !auth) {
    setAuth(token);
  }

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
