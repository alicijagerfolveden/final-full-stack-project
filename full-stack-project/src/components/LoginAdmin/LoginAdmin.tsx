import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

export const LoginAdmin = () => {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg(false);
  }, [username, password]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login-admin", { username, password })
      .then((res) => {
        const token = res.data.token;
        setAuth(token);
        sessionStorage.setItem("token", token);
        setUsername("");
        setPassword("");
        navigate("/register");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrorMsg(true);
        }
      });
  };

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "10px",
        width: "70%",
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          backgroundColor: "violet",
          width: "98%",
          margin: "10px 10px",
          padding: "10px",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        Login to use register to events system
      </Typography>

      <Grid container justifyContent="center" marginTop={5} marginBottom={3}>
        <form onSubmit={handleSubmit}>
          <Grid item marginBottom={2}>
            <TextField
              label="Username"
              variant="outlined"
              required
              sx={{ width: 250 }}
              value={username ?? ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              required
              sx={{ width: 250 }}
              value={password ?? ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item textAlign="center">
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              sx={{ width: 250 }}
            >
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
      {errorMsg ? (
        <Typography
          component="p"
          sx={{
            backgroundColor: "rgb(244, 164, 164)",
            width: "98%",
            margin: "10px 10px",
            padding: "10px",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        >
          Login failed. Please check your credentials
        </Typography>
      ) : null}
    </Box>
  );
};
