import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

const errorMiddleware = (error:Error, req:Request, res:Response, next:NextFunction)=>{
    console.log(error);
    
    if(error instanceof ApiError){
        return res.status(error.statusCode).json(error);
    }
    
    return res.status(500).json(
        new ApiError(500, "Internal Server Error")
    );
}

export {errorMiddleware};