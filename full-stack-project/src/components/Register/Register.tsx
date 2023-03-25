import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const Register = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<Date | null>(new Date());
  const [age, setAge] = useState<number>(0);
  const [events, setEvents] = useState<string[]>([]);
  const [event_id, setEvent_id] = useState<number>(0);
  const eventName = events.map((event: any) => event.name);

  const handleEventChange = (event: any, value: any) => {
    const selectedEvent = events.find((event: any) => event.name === value);

    const getEventId = (value: any) => {
      return value.id;
    };

    const event_id = getEventId(selectedEvent);

    if (event_id) {
      setEvent_id(event_id);
    }
  };

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/events", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const fetchedEvents = res.data;
        setEvents(fetchedEvents);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/users",
        {
          name,
          surname,
          email,
          birthdate,
          event_id,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={eventName}
              onChange={handleEventChange}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Events" />}
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
              value={birthdate?.toLocaleDateString() ?? ""}
              InputProps={{
                inputProps: { min: "1920-01-01", max: new Date() },
              }}
              onChange={(e) => {
                setBirthdate(new Date(e.target.value));
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
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};
