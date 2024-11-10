import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose"

export const generateToken = ( userId: ObjectId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "30d",
    });
    return token;
};