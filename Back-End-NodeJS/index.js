import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PORT } from "./config.js";
import registerAdminRouter from "./src/controllers/register-admin-controller.js";
import loginAdminRouter from "./src/controllers/login-admin-controller.js";
import eventRouter from "./src/controllers/event-controller.js";
import userRouter from "./src/controllers/user-controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/events", eventRouter);
app.use("/register-admin", registerAdminRouter);
app.use("/login-admin", loginAdminRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
