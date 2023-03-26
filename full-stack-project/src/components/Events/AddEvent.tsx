import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const AddEvent = () => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    setErrorMsg("");
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
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSuccessMsg(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg("Something went wrong. Please check data provided");
      });
  };

  return (
    <Box>
      {successMsg ? <p>New event was added</p> : <p>{errorMsg}</p>}
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
              value={date?.toISOString().split("T")[0] ?? ""}
              onChange={(e) => setDate(new Date(e.target.value))}
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
    </Box>
  );
};
