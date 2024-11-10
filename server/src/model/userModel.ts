import mongoose,{ Schema, model } from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser {
    _id?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    profile: string;
    matchpassword(Password: string) : Promise<boolean>;
}


const userSchema = new Schema<IUser>({
    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String },
    profile: { type: String },
}, 
{
    timestamps: true,
}
);

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)

});

userSchema.methods.matchpassword = async function (enteredpassword: string) {
    await bcrypt.compare(enteredpassword, this.password)
}

const User = model<IUser>("User", userSchema);
export default User;