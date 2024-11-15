import mongoose, { ObjectId, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  profile: string;
  matchPassword(Password: string): Promise<boolean>;
}
export type user = mongoose.Document<unknown, IUser> &
  IUser &
  Required<{
    _id: mongoose.mongo.BSON.ObjectId;
  }>;

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String },
    profile: { type: String },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;
