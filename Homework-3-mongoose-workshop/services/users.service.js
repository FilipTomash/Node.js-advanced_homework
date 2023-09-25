import { User } from "../models/users.model.js";
import { CustomError } from "../utils/customError.js";

export class UserService {
  static async getAllUsers() {
    const users = await User.find({});
    return users;
  }
  static async getUserById(userId) {
    const foundUser = await User.findById(userId);
    if (!foundUser) throw new CustomError(401, "No such user");
    return foundUser;
  }
  static async createUser(data) {
    if (data._id) throw new CustomError(401, "Invalid input");
    const newUser = new User(data);
    const createdUser = newUser.save();
    return createdUser;
  }
  static async updateUser(userId, data) {
    if (data._id) throw new CustomError(401, "Invalid input");
    const foundUser = await this.getUserById(userId);
    Object.assign(foundUser, data);
    const updatedUser = foundUser.save();
    return updatedUser;
  }
  static async deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new CustomError(401, "User not found");
  }
  static async loginUser(data) {
    const foundUser = User.findAndValidate(data);
    return foundUser;
  }
  static async saveRefreshToken(userId, refreshToken) {
    const foundUser = await this.getUserById(userId);
    Object.assign(foundUser, refreshToken);
    const updatedUserWithRefreshToken = foundUser.save();
    return updatedUserWithRefreshToken;
  }
  static async deleteRefreshToken(userId, refreshToken) {
    const foundUser = await this.getUserById(userId);
    foundUser.refreshToken = null;
    const updatedUserWithDeletedRefreshToken = foundUser.save();
    return updatedUserWithDeletedRefreshToken;
  }
}
