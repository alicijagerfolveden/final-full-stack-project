import { Box, Typography, Grid, Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export const Header = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    setAuth("");

    sessionStorage.removeItem("accessToken");
  };

  const handleSignInClick = () => {
    navigate("/");
  };

  return (
    <Box
      component="header"
      sx={{ borderBottom: "3px solid gray", marginBottom: "20px" }}
    >
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item>
          <Box
            component="img"
            sx={{ maxHeight: "200px" }}
            src="https://static.vecteezy.com/system/resources/thumbnails/000/552/753/small/fireworks_005.jpg"
            alt="event logo"
          />
        </Grid>
        <Grid item>
          <Typography variant="h3" component="h1" fontFamily="cursive">
            Make your life happier
          </Typography>
        </Grid>
        <Grid item>
          {auth ? (
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 200 }}
              onClick={handleSignOutClick}
            >
              Sign out
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: 200 }}
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
        sx={{ borderTop: "3px solid gray", paddingTop: "29px" }}
      >
        <Link
          to="/users"
          aria-label="users link"
          style={{ textDecoration: "none", fontSize: "20px" }}
        >
          Users
        </Link>
        <Link
          to="/register"
          aria-label="register new user link"
          style={{ textDecoration: "none", fontSize: "20px" }}
        >
          Register new user
        </Link>
        <Link
          to="/events"
          aria-label="events link"
          style={{ textDecoration: "none", fontSize: "20px" }}
        >
          Events
        </Link>
      </Box>
    </Box>
  );
};
