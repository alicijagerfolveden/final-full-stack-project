import { Router } from "express";
import { registerAdmin } from "../services/register-admin.js";

const registerAdminRouter = Router();

registerAdminRouter.post("/", registerAdmin);

export default registerAdminRouter;
