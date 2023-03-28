import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { TLoginAdmin } from "./types";

export const LoginAdmin = () => {
  const { setAuth } = useContext(AuthContext);
  const [admin, setAdmin] = useState<TLoginAdmin>({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setAdmin({ ...admin, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login-admin", {
        username: admin.username,
        password: admin.password,
      })
      .then((res) => {
        const accessToken = res.data.accessToken;
        setAuth(accessToken);
        sessionStorage.setItem("accessToken", accessToken);
        setAdmin({ username: "", password: "" });
        navigate("/register");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrorMsg(true);
        }
      });
  };

  useEffect(() => {
    setErrorMsg(false);
  }, [admin]);

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
          backgroundColor: "rgb(191, 145, 235)",
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
              name="username"
              sx={{ width: 250 }}
              value={admin.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              required
              sx={{ width: 250 }}
              value={admin.password}
              onChange={handleChange}
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
