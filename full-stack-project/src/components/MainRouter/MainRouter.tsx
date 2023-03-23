import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Events } from "../Events";
import { EventUsers } from "../EventUsers";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { LoginAdmin } from "../LoginAdmin";
import { NotFoundPage } from "../NotFoundPage";
import { Register } from "../Register";
import { RegisteredUsers } from "../RegisteredUsers";
import { Unauthorized } from "../Unauthorized";

export const MainRouter = () => {
  return (
    <Box sx={{ margin: "10px", textAlign: "center" }}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<RegisteredUsers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventUsers />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Box>
  );
};
