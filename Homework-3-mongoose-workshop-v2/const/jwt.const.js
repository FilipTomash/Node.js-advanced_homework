import Jwt from "jsonwebtoken";

export const createAccessToken = (userId) => {
  return Jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};
export const verifyAccessToken = (token) => {
  return Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
export const createRefreshToken = (userId) => {
  return Jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
export const verifyRefreshToken = (token) => {
  return Jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
