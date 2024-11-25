import asyncHandler from "express-async-handler";
import { NextFunction, Request, RequestHandler, Response } from "express";
import User, { IUser } from "../model/userModel";
import { generateTocken } from "../utils/generateTocken";
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
      const token = generateTocken(newUser._id);
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
 * @disc    Google Auth
 * @route   POST /api/googleAuth
 * @access  PUBLIC
 */
export const googleAuth: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.body;

    // Fetch additional user data using the access token
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const {
      name,
      email,
      picture,
    }: { name: string; email: string; picture?: string } = response.data;

    const isExist = await User.findOne({ email: email });
    if (isExist) {
      if (isExist.password) {
        res.status(400);
        return next(Error("Cannot Login without password"));
      } else {
        const token = generateTocken(isExist._id);
        res.status(200).json({
          success: true,
          user: {
            _id: isExist._id,
            email: isExist.email,
            name: isExist.name,
            profile: isExist.profile,
          },
          token: token,
        });
      }
    } else {
      const user = await User.create({
        email: email,
        name: name,
        profile: picture,
      });
      const token = generateTocken(user._id);
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          profile: user.profile,
        },
        token: token,
      });
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
        const token = generateTocken(user._id);
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
