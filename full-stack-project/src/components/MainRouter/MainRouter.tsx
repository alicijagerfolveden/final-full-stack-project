import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { LoginAdmin } from "../Login";
import { NotFoundPage } from "../NotFoundPage";
import { Register } from "../Register";

export const MainRouter = () => {
  return (
    <Box sx={{ margin: "10px", textAlign: "center" }}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Box>
  );
};
