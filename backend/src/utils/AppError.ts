import { StatusCodes } from "http-status-codes";
import { AppErrorCode } from "../constants/AppErrorCode";

class AppError extends Error{
    constructor(
          public statusCodes: StatusCodes,
          public message: string,
          public errorCode?: AppErrorCode
    ){
        super(message)
    }
}

export default AppError;