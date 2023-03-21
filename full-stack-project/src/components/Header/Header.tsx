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
            src="https://de23-engine.flamingtext.com/netfu/tmp28000/coollogo_com-2970232.png"
            alt="event logo"
          />
        </Grid>
        <Grid item>
          <Typography variant="h2" component="h1">
            Make your life happier
          </Typography>
        </Grid>
      </Grid>
      <Box
        component="nav"
        display="flex"
        justifyContent="space-around"
        marginBottom={4}
      >
        <Link to="/" style={{ textDecoration: "none", fontSize: "large" }}>
          Pets
        </Link>
        <Link
          to="/medications"
          style={{ textDecoration: "none", fontSize: "large" }}
        >
          Medications
        </Link>
      </Box>
    </Box>
  );
};
