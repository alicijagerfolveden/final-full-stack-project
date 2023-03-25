import { Box, Button, Grid, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";

export const LoginAdmin = () => {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false); //replace with navigation
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg("");
    setSuccessMsg(false);
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
        setSuccessMsg(true);
        navigate("/register");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrorMsg("Login failed. Please check your credentials");
        }
      });
  };

  return (
    <Box>
      {successMsg ? <p>Successfully logged in</p> : <p>{errorMsg}</p>}

      <Grid container justifyContent="center" marginTop={5} marginBottom={3}>
        <form onSubmit={handleSubmit}>
          <Grid item marginBottom={2}>
            <TextField
              label="Username"
              variant="outlined"
              required
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
              value={password ?? ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item textAlign="center">
            <Button variant="outlined" color="secondary" type="submit">
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};
