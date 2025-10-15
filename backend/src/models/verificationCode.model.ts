import mongoose, { mongo } from "mongoose";
import verificationCodeType from "../constants/verificationCodeType";
import { TOO_MANY_REQUESTS } from "../constants/http";

export interface verificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type:  verificationCodeType;
    expiredAt: Date;
    createdAt: Date;
}

const VerificationCodeSchema = new mongoose.Schema<verificationCodeDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required:true, index: true},
    type: { type: String, required: true},
    expiredAt: { type: Date, required: true},
    createdAt: { type: Date, required: true, default: Date.now},

},{
    timestamps: true,
});

const verificationCodeModel = mongoose.model<verificationCodeDocument>("verificationCode", VerificationCodeSchema)