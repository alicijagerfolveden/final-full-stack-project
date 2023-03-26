import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const UpdateUser = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<Date | null>(new Date());
  const [age, setAge] = useState<number>(0);
  const [user, setUser] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [event_id, setEvent_id] = useState<number>(0);
  const eventName = events.map((event: any) => event.name);
  const { id } = useParams();

  //   const [usersEventName, setUsersEventName] = useState<string | undefined>("");

  //   const getUsersEvent = (user: any) => {
  //     const usersEvent = events.find(
  //       (event: any) => event.id === user[0].event_id
  //     );

  //     const getEventName = (value: any) => {
  //       return value.name;
  //     };

  //     const usersEventName = getEventName(usersEvent);

  //     if (usersEventName) {
  //       setUsersEventName(usersEventName);
  //     }
  //   };

  const setStateValues = (user: any) => {
    setName(user[0].name);
    setSurname(user[0].surname);
    setEmail(user[0].email);
    setBirthdate(user[0].birthdate.toLocaleString("en-US").split("T", 1));
    // getUsersEvent(user);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const fetchedUser = res.data;

        setUser(fetchedUser);

        setStateValues(fetchedUser);

        ageCalc(fetchedUser[0].birthdate);
      })
      .catch((error) => console.error(error));

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
              inputProps={{
                min: "1900-01-01",
                max: new Date().toLocaleString("en-US").split("T", 1),
              }}
              value={birthdate?.toLocaleString().split("T")[0] ?? ""}
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
              Update
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};
