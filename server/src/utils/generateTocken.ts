import jwt from "jsonwebtoken";
import { env } from "./envvalid";
import { ObjectId } from "mongodb";

export const generateTocken = (userId: ObjectId) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};