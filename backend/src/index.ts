import dotenv from "dotenv";
dotenv.config(); // before using any process.env use dotenv.config()
import express from "express";
import cors from "cors";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import { dbConnection } from "./config/db";
import cookieParser from "cookie-parser";
import errorHandler from "./middlware/errorHandler";
// import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes  from "./routes/auth.route";
import { clear } from "console";

const app = express();

// middlware read request body  from as a  JSON STRING  and convert this JSON to  JS OBJECT
app.use(express.json());
// middlware: parse url-encoded form data to JS OBJECT
app.use(express.urlencoded({extended: true}));

// middlware cors: cross-origin-resources-sharing :
// prevent websites from sending  requests to servers they are not authorized 
app.use(cors({
      origin: APP_ORIGIN,
      credentials: true, // if you need to send a cookies
    })
)
// middlware cookieParser: parses cookies incoming from requests
// Makes it easy to access cookies via req.cookies
app.use(cookieParser()); 


app.get("/",(req, res, next)=>{
    res.status(OK).json({message: "hey world!"});
})

// AUTH ROUTE
app.use("/auth", authRoutes);


// middleware errors: handle all application errors in one place
app.use(errorHandler);

app.listen(
    PORT,
    async()=>{
        console.log(`server running on port ${PORT} in ${NODE_ENV} environement`);
        await dbConnection();
    }
)