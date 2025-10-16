import mongoose from "mongoose";
import verificationCodeType from "../constants/verificationCodeType";

// Define the interface structure : every  document stored in mongodb when follow this shape
export interface verificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId; 
    type:  verificationCodeType; // type code (email_verification, password_reset)
    expiredAt: Date; 
    createdAt: Date;
}

// create the schema verification code ( template follow by mongodb)
const VerificationCodeSchema = new mongoose.Schema<verificationCodeDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId,
         ref: "User",  // reference to the "User" collection
          required:true, 
         index: true},
    type: { type: String, required: true}, // store the code as type text (email, password reset)
    expiredAt: { type: Date, required: true},
    createdAt: { type: Date, required: true, default: Date.now},

},{
    timestamps: true,
});

// create the verification code model  that we will use for crud operations
const verificationCodeModel = mongoose.model<verificationCodeDocument>(
    "verificationCode",  // name model inside mongoose
    VerificationCodeSchema, // the schema we define above 
    "verification_codes" // the real name  of the collection in mongodb (without the argument mongoose we would name it  )
);

export default verificationCodeModel;