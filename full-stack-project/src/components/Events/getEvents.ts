import axios from "axios";

export const getEvents = (setData: any, setIsLoading: any) => {
  axios
    .get("http://localhost:5000/events", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      setData(res.data);
    })
    .catch((error) => console.error(error))
    .finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1_000);
    });
};
