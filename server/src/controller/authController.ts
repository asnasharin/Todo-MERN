import User from "../model/userModel"
import asyncHandler from "express-async-handler"

/**
 * @desc Create User
 * @route POST /application
 * @access public
 */

export const createUser = asyncHandler(
    async (req, res) => {
        const { email, password, name} = req.body;
        const existUser = await User.findOne()
    }
)

 
 
