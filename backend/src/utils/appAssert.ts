import assert from "node:assert";
import AppError from "./AppError";
import { StatusCodes } from "http-status-codes";
import { AppErrorCode } from "../constants/AppErrorCode";
type AppAssert =(
    condition: any,
    httpsStatusCode: StatusCodes,
    message: string,
    appErrorCode?: AppErrorCode,
) => asserts condition;

const appAssert: AppAssert = (
     condition,
     httpsStatusCode,
     message,
     AppErrorCode,
)=> assert(condition, new AppError(httpsStatusCode, message, AppErrorCode))

export default appAssert