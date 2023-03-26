import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEvents } from "./getEvents";
import { TEvent, TEvents } from "./types";

export const Events = () => {
  const [events, setEvents] = useState<TEvents[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/events/${id}`);
  };

  useEffect(() => {
    getEvents(setEvents, setIsLoading);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Grid container justifyContent="space-around" alignItems="center">
            <Typography variant="h3" textAlign="center" marginTop="50px">
              Events
            </Typography>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/add-event`)}
              >
                Add Event
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            spacing={2}
            justifyContent="center"
            marginTop="50px"
          >
            <Typography width="200px" variant="h5">
              Name
            </Typography>
            <Typography width="300px" variant="h5">
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
        </>
      )}
    </div>
  );
};
