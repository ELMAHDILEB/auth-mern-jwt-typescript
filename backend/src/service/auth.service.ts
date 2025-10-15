import UserModel from "../models/auth.model";

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
      // send verification email
      // create session
      // sign access token & refresh token
      // return user & token
}