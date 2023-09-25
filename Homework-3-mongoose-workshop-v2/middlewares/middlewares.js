import { CustomError } from "../utils/customError.js";
import { verifyAccessToken } from "../const/jwt.const.js";
import { UserService } from "../services/users.service.js";

export const validationToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization; //i couldnt pass thru it because i was calling req.params aaaaaaaaaaaaaaaa
    // console.log(req);
    // console.log(req.params);
    // console.log(authorizationHeader);
    if (!authorizationHeader) throw new CustomError(500, "Something went wrong");
    const token = authorizationHeader.split(" ")[1];
    const { userId } = verifyAccessToken(token);
    // console.log(userId); //i wasnt sure what would the ID from mongoose would come here, i thought to slice or substring if it was passed as new ObjectID("d12213casdcasdasd3"), wasnt sure how it wokrs, now its ok
    await UserService.getUserById(userId);
    return next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};
