import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};
