import { Router } from "express";
import { isLoggedIn } from "../services/token-middleware.js";
import {
  deleteUser,
  getSpecificUser,
  getUsers,
  registerUser,
  updateUser,
} from "../services/user-services.js";

const userRouter = Router();

userRouter.get("/", isLoggedIn, getUsers);
userRouter.get("/:id", isLoggedIn, getSpecificUser);
userRouter.post("/", isLoggedIn, registerUser);
userRouter.delete("/:id", isLoggedIn, deleteUser);
userRouter.patch("/:id", isLoggedIn, updateUser);

export default userRouter;
