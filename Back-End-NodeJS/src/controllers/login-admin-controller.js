import { Router } from "express";
import { loginAdmin } from "../services/login-auth.js";

const loginRouter = Router();

loginRouter.post("/", loginAdmin);

export default loginRouter;
