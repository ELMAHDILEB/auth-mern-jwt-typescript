import mongoose from "mongoose";
import AuthEnv from "../constants/env";

export const dbConnection = async()=>{
    try {
        await mongoose.connect(AuthEnv.MONGO_URI);
        console.log("connection db successfully!")
    } catch (error) {
        console.error("failed connect to DB", error);
        process.exit(1);
    }
}