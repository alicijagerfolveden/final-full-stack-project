import { FC, useEffect, useState } from "react";
import { getEvents } from "./getEvents";
import { TEvent, TEvents } from "./types";

export const Events = () => {
  const [events, setEvents] = useState<TEvents[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getEvents(setEvents, setIsLoading);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        events.map((event: TEvent) => {
          return (
            <div key={event.id}>
              <h2>{event.name}</h2>
              <p>{event.event_date}</p>
            </div>
          );
        })
      )}
    </div>
  );
};
