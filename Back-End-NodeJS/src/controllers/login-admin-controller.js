import { Router } from "express";
import { loginAdmin } from "../services/login-admin.js";

const loginAdminRouter = Router();

loginAdminRouter.post("/", loginAdmin);

export default loginAdminRouter;
