import type { NextFunction, Request, Response } from "express";


const asyncHandler = (fn:(req:Request, res:Response)=>Promise<unknown>)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try {
            await fn(req, res);
        } catch (error) {
            next(error);
        }
    }
}

export {asyncHandler}