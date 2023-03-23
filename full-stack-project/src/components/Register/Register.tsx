import { Box, Button, Grid, TextField } from "@mui/material";
import { useState } from "react";

export const Register = () => {
  // const todayDate = new Date().toLocaleDateString();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>("2023-03-02");
  const [age, setAge] = useState<number>(0);

  const ageCalc = (date: Date) => {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
    console.log(age);
    return age;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
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
              value={name ?? ""}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Surname"
              variant="outlined"
              required
              value={surname ?? ""}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Email"
              variant="outlined"
              required
              type="email"
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item marginBottom={2}>
            <TextField
              label="Birthdate"
              variant="outlined"
              required
              type="date"
              value={birthdate ?? "2023-03-23"}
              onChange={(e) => {
                // setBirthdate(e.target.value);
                // setAge(ageCalc(e.target.value));
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
            />
          </Grid>
          <Grid item textAlign="center">
            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </Grid>
        </form>
      </Grid>
    </Box>
  );
};
