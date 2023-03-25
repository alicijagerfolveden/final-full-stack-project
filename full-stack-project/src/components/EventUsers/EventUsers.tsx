import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TUsers } from "../RegisteredUsers/types";

export const EventUsers = () => {
  const [users, setUsers] = useState<TUsers[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getEventUsers = (setData: any, setIsLoading: any) => {
    axios
      .get(`http://localhost:5000/events/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3_000);
      });
  };

  useEffect(() => {
    getEventUsers(setUsers, setIsLoading);
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
