import User, { IUser } from "../model/userModel"
import asyncHandler from "express-async-handler"
import { generateToken } from "../utils/generateToken";
import { NextFunction, Request, Response } from "express";

/**
 * @desc Create User
 * @route POST /application
 * @access public
 */

export const createUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password, name} = req.body;
        const existUser = await User.findOne({ email: email})
        if (existUser) {
            res.status(409);
            next(Error("email already exist"))
        } else {
            const newUser = await User.create({
                email: email,
                password: password,
                name,
            })
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
)


/**
 * @desc login User
 * @route POST /application
 * @access public
 */
 
export const userLogin = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (user) {
            if (user.password && ( await user.matchpassword(password))){
                const token = generateToken(user.id);
                res.status(200).send({
                    success: true,
                    token: token,
                    user: {
                        _id: user.id,
                        email: user.email,
                        password: user.password,
                        profile: user.profile
                    }
                })
            } else {
                res.status(401);
                return next(Error("Invalid credentials"))
            }
        } else {
            res.status(401)
            return next(Error("user not found"))
        }
    }
)
 
