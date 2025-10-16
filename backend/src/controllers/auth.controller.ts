import z from "zod";
import catchErrors from "../utils/catchErrors";
import { StatusCodes } from "http-status-codes";

// create register schema using zod 
export const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(6).max(255),
    confirmPassword: z.string().min(6).max(255),
    userAgent: z.string().optional()
}).refine(
    (data)=> data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password do not matched!",
    })

export const registerHandler = catchErrors(async (req, res)=>{
     // validate request
     const result = registerSchema.safeParse({
        ...req.body,
        userAgent: req.header("user-agent")
     });

     const request = result.data;

     if(!result.success){
        res.status(StatusCodes.BAD_REQUEST).json({
            message: "VALIDATION ERROR",
            errors: result.error.format(),
        })
     }

     // call service

     // return response
     res.status(StatusCodes.CREATED).json({
        message: "user registered successfully",
        user:{
            email: request?.email,
            userAgent: request?.userAgent
        }
     })
})
