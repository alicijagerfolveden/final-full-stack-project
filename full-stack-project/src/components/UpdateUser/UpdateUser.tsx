import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TUser } from "./types";

export const UpdateUser = () => {
  const [user, setUser] = useState<TUser>({
    id: 0,
    name: "",
    surname: "",
    email: "",
    birthdate: "",
    event_id: 0,
    event_name: "",
  });
  const { id } = useParams();
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const setStateValues = (user: any) => {
    setUser({
      id: user[0].id,
      name: user[0].name,
      surname: user[0].surname,
      email: user[0].email,
      birthdate: user[0].birthdate.toLocaleString("en-US").split("T", 1)[0],
      event_id: user[0].event_id,
      event_name: user[0].event_name,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setUser({ ...user, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:5000/users/${id}`,
        {
          name: user.name,
          surname: user.surname,
          email: user.email,
          birthdate: user.birthdate?.toLocaleString("en-US").split("T", 1)[0],
          event_id: user.event_id,
          event_name: user.event_name,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(() => {
        setSuccessMsg(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(true);
      });
  };

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [user]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        const fetchedUser = res.data;

        setStateValues(fetchedUser);
      })
      .catch((error) => console.error(error));
  }, [id]);

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
        Update user data
      </Typography>
      <Grid container justifyContent="center" marginTop={5} marginBottom={3}>
        <form onSubmit={handleSubmit}>
          <Grid item marginBottom={2}>
            <TextField
              label="Name"
              variant="outlined"
              required
              name="name"
              sx={{ width: 300 }}
              value={user.name ?? ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Surname"
              variant="outlined"
              required
              name="surname"
              sx={{ width: 300 }}
              value={user.surname ?? ""}
              onChange={handleChange}
            />
          </Grid>

          <Grid item marginBottom={2}>
            <TextField
              disabled
              label="Event"
              name="event_name"
              value={user.event_name ?? ""}
              sx={{ width: 300 }}
            />
          </Grid>

          <Grid item marginBottom={2}>
            <TextField
              label="Email"
              variant="outlined"
              required
              sx={{ width: 300 }}
              type="email"
              name="email"
              value={user.email ?? ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Birthdate"
              type="date"
              required
              sx={{ width: 300 }}
              variant="outlined"
              inputProps={{
                min: "1900-01-01",
                max: "2021-01-01",
              }}
              name="birthdate"
              value={user.birthdate ?? ""}
              onChange={handleChange}
            />
          </Grid>
          <Grid item textAlign="center">
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              sx={{ width: 300, height: 50 }}
            >
              Update
            </Button>
          </Grid>
        </form>
      </Grid>
      {successMsg ? (
        <Typography
          component="p"
          sx={{
            backgroundColor: "rgb(128, 218, 128)",
            width: "98%",
            margin: "10px 10px",
            padding: "10px",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        >
          User was updated successfully.
        </Typography>
      ) : null}

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
          Cannot update user data. Please check data provided.
        </Typography>
      ) : null}
    </Box>
  );
};
