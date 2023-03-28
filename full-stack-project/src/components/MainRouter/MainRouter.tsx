import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "../AuthContext";
import { Events, AddEvent } from "../Events";
import { EventUsers } from "../EventUsers";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { LoginAdmin } from "../LoginAdmin";
import { NotFoundPage } from "../NotFoundPage";
import { Register } from "../Register";
import { RegisteredUsers } from "../RegisteredUsers";
import { UpdateUser } from "../UpdateUser";
import { Layout } from "./Layout";

export const MainRouter = () => {
  return (
    <Box sx={{ margin: "10px", textAlign: "center" }}>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<LoginAdmin />} />
          <Route element={<RequireAuth />}>
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<RegisteredUsers />} />
            <Route path="/user/:id" element={<UpdateUser />} />
            <Route path="/events" element={<Events />} />
            <Route path="/add-event" element={<AddEvent />} />
            <Route path="/events/:id" element={<EventUsers />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Footer />
    </Box>
  );
};
