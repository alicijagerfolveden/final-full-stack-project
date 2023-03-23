import { Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Box component="header">
      <Grid container justifyContent="center" alignItems="center">
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
