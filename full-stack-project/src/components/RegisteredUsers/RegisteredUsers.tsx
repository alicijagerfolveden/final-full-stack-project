import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsers } from "./getUsers";
import { TUsers } from "./types";

export const RegisteredUsers = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers(setUsers, setIsLoading);
  }, []);

  return (
    <>
      <h1>List of Registered Users</h1>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Birthday</th>
                <th>Event in</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => {
                return (
                  <tr key={user.id}>
                    <td>{`${user.name} ${user.surname}`}</td>
                    <td>{user.email}</td>
                    <td>{user.birthdate.split("T", 1)}</td>
                    <td>{user.event_id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
