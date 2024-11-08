import mongoose,{ Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String },
    profile: { type: String },
}, 
{
    timestamps: true,
}
);

const User = model("User", userSchema);
export default User;