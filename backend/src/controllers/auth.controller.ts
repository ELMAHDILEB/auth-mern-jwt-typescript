import catchErrors from "../utils/catchErrors";
import { StatusCodes } from "http-status-codes";
import { createAccount, loginUser } from "../service/auth.service";
import setAuthCookies from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";


export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const result = registerSchema.safeParse({
    ...req.body,
    userAgent: req.header("user-agent"),
  });

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "VALIDATION ERROR",
      errors: result.error.format(),
    });
  }

  const request = result?.data;

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // set cookies then send response
  setAuthCookies({res, accessToken, refreshToken})
  return res.status(StatusCodes.CREATED).json(user);
});


export const loginHandler = catchErrors(async (req, res)=>{
    // validate request
    const request = loginSchema.parse({...req.body, userAgent: req.header("user-agent"),});
    const {accessToken, refreshToken} = await loginUser(request);

    setAuthCookies({res, accessToken, refreshToken})
    return res.status(StatusCodes.OK).json({
      message: "Login successful",
    })
})