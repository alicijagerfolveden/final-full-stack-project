import { Router } from "express";
import { isLoggedIn } from "../services/token-middleware.js";
import {
  deleteUser,
  getUsers,
  registerUser,
} from "../services/user-services.js";

const userRouter = Router();

userRouter.get("/", isLoggedIn, getUsers);
userRouter.post("/", isLoggedIn, registerUser);
userRouter.delete("/:id", isLoggedIn, deleteUser);

export default userRouter;
