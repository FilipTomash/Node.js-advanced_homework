import { Router } from "express";
import { UserController } from "../controllers/users.controller.js";
export const userRouter = Router();
import { catchAsync } from "../utils/utils.js";
// userRouter.use(catchAsync) why cant i do like this, POSTMAN freaks out :)))
userRouter.route("/").get(catchAsync(UserController.getAllUsers)).post(catchAsync(UserController.createUser));

userRouter
  .route("/:id")
  .get(catchAsync(UserController.getUserById))
  .patch(catchAsync(UserController.updateUser))
  .delete(catchAsync(UserController.deleteUser));

userRouter.post("/login", catchAsync(UserController.loginUser));
userRouter.post("/refresh-token", catchAsync(UserController.refreshAccessToken));
userRouter.post("/logout", catchAsync(UserController.logoutUser));
