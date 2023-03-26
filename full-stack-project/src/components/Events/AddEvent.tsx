import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const AddEvent = () => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<
    string | number | readonly string[] | undefined
  >("2023-04-01");
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);

  useEffect(() => {
    setErrorMsg(false);
    setSuccessMsg(false);
  }, [name, date]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/events",
        {
          name,
          event_date: date,
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
        Add new event
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
              label="Event date"
              type="date"
              required
              sx={{ width: 300 }}
              variant="outlined"
              inputProps={{
                min: "2021-01-01",
                max: "2050-01-01",
              }}
              value={date ?? ""}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          <Grid item textAlign="center">
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              sx={{ width: 300, height: 50 }}
            >
              Add
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
          New event was added
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
          Register failed. Please check data provided
        </Typography>
      ) : null}
    </Box>
  );
};
