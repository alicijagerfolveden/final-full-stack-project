import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "./getUsers";
import { TUsers } from "./types";

export const RegisteredUsers = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers(setUsers, setIsLoading);
  }, []);

  const handleDeleteButton = (id: number) => {
    axios
      .delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        getUsers(setUsers, setIsLoading);
        alert("User deleted");
      })
      .catch((error: any) => console.error(error));
  };

  const handleUpdateButton = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <>
      <h1>List of Registered Users</h1>
      <Grid alignItems="center">
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
                  <th>Delete</th>
                  <th>Update</th>
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
                      <td>
                        <Button
                          color="secondary"
                          onClick={() => handleDeleteButton(user.id)}
                        >
                          Delete
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="secondary"
                          onClick={() => handleUpdateButton(user.id)}
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Grid>
    </>
  );
};
