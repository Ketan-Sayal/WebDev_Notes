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

export const update = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user;
    const todoId = req.params.id;

    if (!todoId) {
      throw new ApiError(400, "Todo ID is required");
    }

    const todo = await Todo.findById(todoId);

    if (!todo) {
      throw new ApiError(404, "Todo not found");
    }

    if (String(todo.user) !== String(user!.id)) {
      throw new ApiError(403, "User did not match");
    }

    const { title, task, completed } = req.body;

    // Update title only when provided
    if (title !== undefined) {
      if (typeof title !== "string" || !title.trim()) {
        throw new ApiError(400, "Title cannot be empty");
      }

      todo.title = title.trim();
    }

    // Update task description only when provided
    if (task !== undefined) {
      if (typeof task !== "string" || !task.trim()) {
        throw new ApiError(400, "Task cannot be empty");
      }

      todo.task = task.trim();
    }

    // Handle both true and false
    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        throw new ApiError(400, "Completed must be a boolean");
      }

      todo.completed = completed;
    }

    await todo.save();

    return res.status(200).json(
      new ApiResponse(200, { todo }, "Todo updated successfully")
    );
  }
);


export const deleteTodo = asyncHandler(async(req:Request, res:Response)=>{
    const user =  req.user;
    const todoId = req.params.id;

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