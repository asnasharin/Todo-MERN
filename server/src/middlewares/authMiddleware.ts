import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User, { IUser } from "../model/userModel";
import { env } from "../utils/envvalid";
import mongoose from "mongoose";

declare module "express" {
  interface Request {
    user?: IUser;
  }
}

export const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
        const userId = new mongoose.Types.ObjectId(decoded.userId);
        const user = await User.findOne({ _id: userId });
        if (!user) {
          res.status(401);
          next(Error("Unauthorized user"));
        } else {
          req.user = user;
        }
        next();
      } catch (error) {
        res.status(401);
        next(new Error("Not authorized, token failed"));
      }
    } else {
      res.status(401);
      next(new Error("Not authorized, token failed"));
    }
  }
);
