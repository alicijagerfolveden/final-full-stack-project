import {
  Box,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "./getUsers";
import { TUsers } from "./types";

export const RegisteredUsers = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getUsers(setUsers, setIsLoading);
  }, []);

  const handleDeleteButton = (id: number) => {
    axios
      .delete(`http://localhost:5000/users/${id}`, {
        headers: {
          AuTableCellorization: `Bearer ${sessionStorage.getItem(
            "accessToken"
          )}`,
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
    <Box
      sx={{
        borderRadius: "10px",
        border: "1px solid black",
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
          padding: "20px",
          margin: "10px 10px",
          borderRadius: "10px",
          boxSizing: "border-box",
        }}
      >
        List of Registered Users
      </Typography>
      <Grid
        display="grid"
        justifyContent="space-around"
        marginTop="50px"
        marginBottom="50px"
        alignItems="center"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Birthday</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Event in</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell role="loading-message" sx={{ fontWeight: "bold" }}>
                  Loading...
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {users.map((user: any) => {
                return (
                  <TableRow
                    sx={{
                      "&:hover": { backgroundColor: "rgb(250, 245, 237)" },
                    }}
                    key={user.id}
                  >
                    <TableCell>{`${user.name} ${user.surname}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.birthdate.split("T", 1)}</TableCell>
                    <TableCell>{user.event_name}</TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => handleDeleteButton(user.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => handleUpdateButton(user.id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </Grid>
    </Box>
  );
};
