import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    verified: boolean;
    createAt: Date;
    updateAt: Date;
    comparePassword(val: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    verified: { type: Boolean, required: true, default: false},
}, {
    timestamps: true,
})


// Middlware:  hash password before stock
userSchema.pre('save', async function (next){
    if(!this.isModified("password")) return next();
   this.password = await hashValue(this.password)
   next();
});

userSchema.methods.comparePassword = async function (value: string){
    return compareValue(value, this.password);
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
