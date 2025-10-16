import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import z from "zod";
import { StatusCodes } from "http-status-codes";

const handleZodError = (res: Response, error: z.ZodError)=>{
    const errors = error.issues.map((err)=>({
        path: err.path.join("."), 
        message: err.message 
    }))
   return  res.status(StatusCodes.BAD_REQUEST).json({
    message: error.message,
    errors
   })
}

const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof z.ZodError) return handleZodError(res, error);
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Internal server error!"});
}

export default errorHandler;
