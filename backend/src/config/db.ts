import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env";

export const dbConnection = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("connection db successfully!")
    } catch (error) {
        console.error("failed connect to DB", error);
        process.exit(1);
    }
}