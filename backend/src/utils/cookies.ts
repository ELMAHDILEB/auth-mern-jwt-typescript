import {CookieOptions, Response} from 'express'
import AuthEnv from '../constants/env'
import DateUtil from '../utils/date';


const secure =  AuthEnv.NODE_ENV !== "development";

type Params = {
    res: Response,
    accessToken: string,
    refreshToken: string
}

const defaults: CookieOptions ={
    httpOnly: true,
    sameSite: "strict",
    secure,
}

const getAccessTokenCookiesOptions = (): CookieOptions =>(
    {
        ...defaults,
        // store access Token
        expires: DateUtil.fifteenMinutesFromNow(),
    }
)
const getRefreshTokenCookiesOptions = (): CookieOptions =>(
    {
        ...defaults,
        // store refresh Token
        expires: DateUtil.thirtyDaysFromNow(),
        path: "/auth/refresh"
    }
)

export default function setAuthCookies({res, accessToken, refreshToken}: Params){

    res.cookie("accessToken", accessToken, getAccessTokenCookiesOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookiesOptions());
}