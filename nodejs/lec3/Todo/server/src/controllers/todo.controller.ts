import type { Request, Response } from "express";
import { Todo } from "../models/todo.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/ayncHandler.js";



export const getAll = asyncHandler(async(req:Request, res:Response)=>{
    const user = req?.user;
    const todos = await Todo.find({user:user!.id});
    return res.status(201).json(
        new ApiResponse(201, {todos}, "Todos sent sucessfully")
    );
});

export const create = asyncHandler(async(req:Request, res:Response)=>{
    const user = req?.user;
    const {task, title} = req.body;
    if([task, title].some((x)=>!x || x=="")){
        throw new ApiError(403, "Invalid data recived");
    }

    const todo = await Todo.create({
        title:title,
        task,
        user:user!.id
    });

    return res.status(201).json(
        new ApiResponse(201, {todo}, "Todo created sucessfully")
    );
});