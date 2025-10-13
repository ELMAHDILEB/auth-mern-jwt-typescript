import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
    console.log(`Error is ${req.path} `)
         return res.status(INTERNAL_SERVER_ERROR).send({message: "Internal server error!"})
}

export default errorHandler;
