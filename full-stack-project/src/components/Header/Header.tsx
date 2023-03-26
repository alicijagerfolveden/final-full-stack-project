import { Box, Typography, Grid, Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

export const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    setAuth("");

    sessionStorage.removeItem("token");
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <Box component="header" sx={{ borderBottom: "10px solid gray" }}>
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Box
            component="img"
            sx={{ maxHeight: "200px" }}
            src="https://t4.ftcdn.net/jpg/01/34/81/83/360_F_134818360_o6AaEjnTewYEydXi8pdkgyOufTVUlJkP.jpg"
            alt="event logo"
          />
        </Grid>
        <Grid item>
          <Typography variant="h3" component="h1">
            Make your life happier
          </Typography>
        </Grid>
        <Grid item>
          {auth ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSignOutClick}
            >
              Sign out
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSignInClick}
            >
              Sign in
            </Button>
          )}
        </Grid>
      </Grid>
      <Box
        component="nav"
        display="flex"
        justifyContent="space-around"
        marginBottom={4}
        marginLeft={10}
        marginRight={10}
      >
        <Link to="/users" style={{ textDecoration: "none", fontSize: "large" }}>
          Users
        </Link>
        <Link
          to="/register"
          style={{ textDecoration: "none", fontSize: "large" }}
        >
          Register new user
        </Link>
        <Link
          to="/events"
          style={{ textDecoration: "none", fontSize: "large" }}
        >
          Events
        </Link>
      </Box>
    </Box>
  );
};
