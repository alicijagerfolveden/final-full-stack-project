import {
  Button,
  Grid,
  Typography,
  Box,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "./getEvents";
import { TEvent, TEvents } from "./types";

export const Events = () => {
  const [events, setEvents] = useState<TEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [sortType, setSortType] = useState<string>("none");

  const handleClick = (id: number) => {
    navigate(`/events/${id}`);
  };

  useEffect(() => {
    if (sortType === "name") {
      const sortedByName = [...events].sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      return setEvents(sortedByName);
    }

    if (sortType === "date") {
      const sortedByDate = [...events].sort((a, b) =>
        a.event_date > b.event_date ? 1 : -1
      );
      return setEvents(sortedByDate);
    }

    if (sortType === "none") {
      return getEvents(setEvents, setIsLoading);
    }
  }, [sortType, events]);

  return (
    <Box
      sx={{
        borderRadius: "10px",
        border: "1px solid black",
        width: "70%",
        margin: "auto",
      }}
    >
      <Grid
        container
        role="events-container"
        justifyContent="space-around"
        marginTop="50px"
        alignItems="center"
        sx={{
          backgroundColor: "rgb(191, 145, 235)",
          width: "98%",
          padding: "20px",
          margin: "10px 10px",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h4" textAlign="center">
          Events
        </Typography>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/add-event`)}
          >
            Add Event
          </Button>
        </Grid>
      </Grid>
      {isLoading ? (
        <h4 aria-label="loading-message">Loading...</h4>
      ) : (
        <Box>
          <InputLabel id="sorting">Sort By</InputLabel>
          <Select
            labelId="sorting"
            label="Sort By"
            variant="standard"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            sx={{ width: "150px" }}
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
          <Grid
            container
            alignItems="center"
            spacing={2}
            justifyContent="center"
            marginTop="50px"
          >
            <Typography width="150px" variant="h5">
              Name
            </Typography>
            <Typography width="350px" variant="h5">
              Date
            </Typography>
          </Grid>
          {events.map((event: TEvent) => {
            return (
              <Grid
                container
                key={event.id}
                alignItems="center"
                spacing={2}
                margin="20px 10px"
                justifyContent="center"
                sx={{
                  borderBottom: "1px solid black",
                  boxSizing: "border-box",
                  width: "98%",
                }}
              >
                <Typography width="250px">{event.name}</Typography>
                <Typography width="250px">
                  {event.event_date?.split("T", 1)}
                </Typography>
                <Button onClick={() => handleClick(event.id)}>
                  Show users
                </Button>
              </Grid>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
