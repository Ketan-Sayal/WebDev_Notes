import jwt, { type JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { config } from "../config/index.js";
import type { Request, Response, NextFunction } from "express"

const jwtSecret = config.jwtSecret;

export const isLoggedIn = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const token = req.headers.authorization?.replace("Bearer ", "") || req.cookies?.token;
        if(!token){
            throw new ApiError(401, "Unauthorized user");
        }
        const userData = jwt.verify(token, jwtSecret) as JwtPayload & {id:string};

        if(!userData || !userData.id){
            throw new ApiError(401, "Unauthorized user");
        }

        req.user = userData;

        next();
    } catch (error) {
        next(error);
    }
}