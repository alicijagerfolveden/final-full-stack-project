import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UpdateUser = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<
    string | number | readonly string[] | undefined
  >("2023-04-01");
  const [age, setAge] = useState<number>(0);
  const [event_id, setEvent_id] = useState<number>(0);
  const { id } = useParams();
  const [usersEventName, setUsersEventName] = useState<string | undefined>("");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  const setStateValues = (user: any) => {
    setName(user[0].name);
    setSurname(user[0].surname);
    setEmail(user[0].email);
    setBirthdate(user[0].birthdate.toLocaleString("en-US").split("T", 1));
    setUsersEventName(user[0].event_name);
    setEvent_id(user[0].event_id);
  };

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [name, surname, email, birthdate]);

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

        ageCalc(fetchedUser[0].birthdate);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const ageCalc = (date: Date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
    return age;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch(
        `http://localhost:5000/users/${id}`,
        {
          name,
          surname,
          email,
          birthdate,
          event_id,
          event_name: usersEventName,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setSuccessMsg(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(true);
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
              sx={{ width: 300 }}
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Surname"
              variant="outlined"
              required
              sx={{ width: 300 }}
              value={surname ?? ""}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Grid>

          <Grid item marginBottom={2}>
            <TextField
              disabled
              label="Event"
              value={usersEventName ?? ""}
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
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
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
              value={birthdate ?? ""}
              onChange={(e) => {
                setBirthdate(e.target.value);
                ageCalc(new Date(e.target.value));
              }}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Age"
              variant="outlined"
              required
              type="number"
              value={age}
              disabled
              sx={{ width: 300 }}
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
