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

export const update = asyncHandler(async(req:Request, res:Response)=>{
    const user = req.user;
    const todoId = req.query.id;
    let {title, task} = req.body;
    
    if(typeof title!=="string" || typeof task!=="string" || typeof todoId!="string") {
        throw new ApiError(402, "Todo id is required");
    }
    
    title = title.trim();
    task = task.trim();

    if (!title || !task) {
        throw new ApiError(400, "Title and task cannot be empty");
    }
    const todo = await Todo.findById(todoId);
    
    if(!todo || todo===null) throw new ApiError(404, "Todo not found");

    if(String(todo.user)!==String(user!.id)){
        throw new ApiError(403, "User did not match");
    }

    todo.title = title;
    todo.task = task;
    await todo.save();

    return res.status(200).json(
        new ApiResponse(200, {todo}, "Todo updated sucessfully")
    );
});

export const deleteTodo = asyncHandler(async(req:Request, res:Response)=>{
    const user =  req.user;
    const todoId = req.query.id;

    if(!todoId || typeof todoId !=="string"){
        throw new ApiError(400, "Todo id is required");
    }
    
    const todo = await Todo.findById(todoId);
    
    if(!todo) throw new ApiError(404, "Todo not found");
    
    if(String(todo.user)!==String(user!.id)){
        throw new ApiError(403, "User did not match");
    }

    await Todo.findByIdAndDelete(todo.id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Todo deleted sucessfully")
    );
});