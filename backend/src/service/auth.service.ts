import jwt from "jsonwebtoken"
import verificationCodeType from "../constants/verificationCodeType";
import UserModel from "../models/auth.model";
import SessionModel from "../models/session.model";
import verificationCodeModel from "../models/verificationCode.model";
import DateUtil from "../utils/date";
import AuthEnv from "../constants/env";
import appAssert from "../utils/appAssert";
import { StatusCodes } from "http-status-codes";

type CreateAccountParams = {
    email: string;
    password: string;
    userAgent?: string;
}
export const createAccount = async(data: CreateAccountParams)=>{
      // verify existing user doesn't exist
      const existingUser = await UserModel.exists({
        email: data.email,
      })
      // if(existingUser) throw new Error("User already exists");
      appAssert(
        !existingUser, StatusCodes.CONFLICT,  "Email already in use"
      )
      // create user
      const user = await UserModel.create({
        email: data.email,
        password: data.password,
      })
      // create verification code
      const verificationCode = await verificationCodeModel.create({
        userId: user._id,
        type: verificationCodeType.EmailVerification,
        expiredAt: DateUtil.oneYearFromNow()
      })
      // send verification email

      // create session
      const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
      })
     
      // sign access token & refresh token
      const refreshToken = jwt.sign(
        {
          session: session._id
        },
        AuthEnv.JWT_REFRESH_SECRET!,
         {
          audience: ["user"],
          expiresIn: "30d"
        }
      )

      const accessToken = jwt.sign(
        {
          userId: user._id,
          session: session._id
        },
        AuthEnv?.JWT_ACCESS_SECRET!,
        {
          audience: ["user"],
          expiresIn: "15m"
        }
      )

      // return user & tokens
      return {
        user: user.omitPassword(),
        accessToken,
        refreshToken
      }
}

type LoginParams = CreateAccountParams;
export  const loginUser = async ({email, password, userAgent}: LoginParams) =>{
     // get the user by email
     const user = await UserModel.findOne({email});
     appAssert(user, StatusCodes.UNAUTHORIZED, "Invalid email or password");

     // validate password from the requrest
     const isValid = await user.comparePassword(password);
     appAssert(password, StatusCodes.UNAUTHORIZED, "Invalid email or passowrd");
     const userId = user._id;

     //create a session
     const session = await SessionModel.create({
      userId,
      userAgent,
     });

     const sessionInfo = {
      sessionId: session._id,
     }

     // sign acces token & refresh token
     const refreshToken = jwt.sign(
      {
        sessionInfo,
      },
      AuthEnv.JWT_REFRESH_SECRET!,
       {
        audience: ["user"],
        expiresIn: "30d"
      }
    )

    const accessToken = jwt.sign(
      {
        ...sessionInfo,
        userId: user._id,
        
      },
      AuthEnv?.JWT_ACCESS_SECRET!,
      {
        audience: ["user"],
        expiresIn: "15m"
      }
    )

     // return user & tokens
     return {
      user: user.omitPassword(),
      accessToken,
      refreshToken,
     }
}