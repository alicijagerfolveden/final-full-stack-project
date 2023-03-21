import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2_000);
  }, []);

  return (
    <Typography component="h2" fontWeight="bold">
      404 - Page Not Found
    </Typography>
  );
};
