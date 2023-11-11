import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.route("/users").get(getAllUsers);

userRouter
  .route("/user/:id")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter;
