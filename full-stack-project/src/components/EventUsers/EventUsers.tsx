import {
  Box,
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
import { useParams } from "react-router-dom";
import type { TUsers } from "../RegisteredUsers/types";

export const EventUsers = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/events/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1_000);
      });
  }, [id]);

  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "10px",
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
              {users.map((user: any, id: number) => {
                return (
                  <TableRow
                    sx={{
                      "&:hover": { backgroundColor: "rgb(250, 245, 237)" },
                    }}
                    key={id}
                  >
                    <TableCell>{`${user.name} ${user.surname}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.birthdate.split("T", 1)}</TableCell>
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
