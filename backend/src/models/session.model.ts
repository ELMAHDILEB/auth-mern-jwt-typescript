import mongoose from "mongoose";
import DateUtil from "../utils/date";

interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId,
    userAgent?: string,
    createdAt: Date,
    expiredAt: Date,
}

// create Schema
const sessionSchema = new mongoose.Schema<SessionDocument>(
    {
        userId: {
            ref: "User",
            type: mongoose.Schema.Types.ObjectId,
           index: true
        },
        userAgent: { type: String},
        createdAt: { type: Date, required: true, default:Date.now},
        expiredAt: { type: Date,
            default: DateUtil.thirtyDaysFromNow
        }
    });

    const SessionModel = mongoose.model<SessionDocument>("session", sessionSchema)
    export default SessionModel