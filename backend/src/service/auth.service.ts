import { jwt } from "zod";
import verificationCodeType from "../constants/verificationCodeType";
import UserModel from "../models/auth.model";
import SessionModel from "../models/session.model";
import verificationCodeModel from "../models/verificationCode.model";
import DateUtil from "../utils/date";

export type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
}
export const createAccount = async(data: CreateAccountParams)=>{
      // verify existing user doesn't exist
      const existingUser = await UserModel.exists({
        email: data.email,
      })
      if(existingUser) throw new Error("User already exists");
      // create user
      const user = await UserModel.create({
        email: data.email,
        password: data.password,
      })
      // create verification code
      const verificationCode = await verificationCodeModel.create({
        userId: user._id,
        type: verificationCodeType.EmailVerification,
        expiredAt: DateUtil.oneYearFromNow
      })
      // send verification email

      // create session

      const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
      })
     
      // sign access token & refresh token
      const accessToken = jwt.sign(
        {
          userId: user._id,
          session: session._id
        },
        JWT_SECRET,
         {
          audience: ["user"],
          expiresIn: "30min"
        }
      )

      // return user & token
}