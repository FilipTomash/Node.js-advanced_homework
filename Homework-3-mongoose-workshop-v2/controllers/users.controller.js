import { UserService } from "../services/users.service.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../const/jwt.const.js";

export class UserController {
  static async getAllUsers(req, res) {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  }
  static async getUserById(req, res) {
    const id = req.params.id;
    const foundUser = await UserService.getUserById(id);
    res.status(200).json(foundUser);
  }
  static async createUser(req, res) {
    const data = req.body;
    const createdUser = await UserService.createUser(data);
    res.status(201).json(createdUser);
  }
  static async updateUser(req, res) {
    const id = req.params.id;
    const data = req.body;
    const updatedUser = await UserService.updateUser(id, data);
    res.status(201).json(updatedUser);
  }
  static async deleteUser(req, res) {
    const id = req.params.id;
    await UserService.deleteUser(id);
    res.sendStatus(204);
  }
  static async loginUser(req, res) {
    const data = req.body;
    const loggedUser = await UserService.loginUser(data);
    const accessToken = createAccessToken(loggedUser._id);
    res.set("access-token", accessToken);
    // console.log(loggedUser._id);
    // console.log("The access token from auth controller is", accessToken);
    const refreshToken = createRefreshToken(loggedUser._id);
    await UserService.saveRefreshToken(loggedUser._id, refreshToken);
    res.set("refresh-token", refreshToken);
    res.status(200).json(loggedUser);
  }
  static async refreshAccessToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      // console.log("Refresh token is: ", refreshToken);
      if (!refreshToken) throw new Error();
      const { userId } = verifyRefreshToken(refreshToken);
      const loggedUser = await UserService.getUserById(userId);
      // console.log("The user is: ", loggedUser);
      // console.log(loggedUser.refreshToken);
      if (refreshToken !== loggedUser.refreshToken) throw new Error();
      const accessToken = createAccessToken(loggedUser._id);
      res.set("access-token", accessToken);

      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(403);
    }
  }
  static async logoutUser(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      const { userId } = verifyRefreshToken(refreshToken);
      await UserService.deleteRefreshToken(userId);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
}
