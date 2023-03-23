import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Unauthorized = () => {
  return (
    <section>
      <Typography component="h2" fontWeight="bold">
        You don't have permission to this page. Please sign in.
      </Typography>
      <Link to="/">Sign in</Link>
    </section>
  );
};
