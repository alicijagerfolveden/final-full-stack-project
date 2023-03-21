import { Box, Button, Grid, TextField } from "@mui/material";

export const Register = () => {
  return (
    <Box>
      <Grid container justifyContent="center" marginTop={5} marginBottom={3}>
        <form action="">
          <Grid item marginBottom={2}>
            <TextField label="Full name" variant="outlined" />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField label="Email" variant="outlined" type="email" />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField label="Password" variant="outlined" type="password" />
          </Grid>
          <Grid item textAlign="center">
            <Button variant="outlined" color="secondary">
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};
