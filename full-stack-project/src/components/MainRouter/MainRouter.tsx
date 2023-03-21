import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { NotFoundPage } from "../NotFoundPage";

export const MainRouter = () => {
  return (
    <Box sx={{ margin: "10px", textAlign: "center" }}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element="something" />
          <Route path="/cart" element="anotherthing" />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Box>
  );
};
