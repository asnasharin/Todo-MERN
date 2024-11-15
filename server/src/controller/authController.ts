import asyncHandler from "express-async-handler";
import { NextFunction, Request, RequestHandler, Response } from "express";
import User, { IUser } from "../model/userModel";
import { generateToken } from "../utils/generateToken";
import axios from "axios";

/**
 * @desc     Create user
 * @route    POST /api
 * @access   public
 */
export const createUser: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    const existUser = await User.findOne({ email: email });
    if (existUser) {
      res.status(409);
      next(Error("Email Alredy Exist!"));
    } else {
      const newUser = await User.create({
        email: email,
        password: password,
        name: name,
      });
      const token = generateToken(newUser.id);
      if (newUser && token) {
        res.status(200).json({
          success: true,
          message: "User Created Successfully!",
          token: token,
          user: {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
          },
        });
      }
    }
  }
);

/**
 * @disc    user login
 * @route   POST /api/login
 * @access  PUBLIC
 */
export const userLogin: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password && (await user.matchPassword(password))) {
        const token = generateToken(user.id);
        res.status(200).json({
          success: true,
          token: token,
          user: {
            _id: user._id,
            email: user.email,
            name: user.name,
            profile: user.profile,
          },
        });
      } else {
        res.status(401);
        return next(Error("Invalid Credentials"));
      }
    } else {
      res.status(401);
      return next(Error("User Not Found!"));
    }
  }
);
