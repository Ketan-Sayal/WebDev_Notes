import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/ayncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { UserObj, UserSigninObj } from "../utils/validations.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { config } from "../config/index.js";

export const signup = asyncHandler(async(req:Request, res:Response)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        throw new ApiError(400, "Invalid details");
    }

    const userValidate = UserObj.safeParse({username, email, password});

    if(!userValidate.success){
        throw new ApiError(400, "Invalid details");
    }

    const user = await User.findOne({email});

    if(user) throw new ApiError(403, "User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    const userCreated = await User.create({
        username,
        email,
        password:hashPassword
    });

    const userSent = await User.findById(userCreated._id).select("-password").populate("todos");

    if(!userSent) throw new ApiError(404, "User not found");

    const token = jwt.sign({id:userSent._id.toString()}, config.jwtSecret);

    return res.cookie("token", token).status(200).json(
        new ApiResponse(200, {user:userSent, token}, "User created sucessfully")
    );
});

export const signin = asyncHandler(async(req:Request, res:Response)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(400, "Invalid details");
    }

    const userValidate = UserSigninObj.safeParse({email, password});

    if(!userValidate.success){
        throw new ApiError(400, "Invalid details");
    }

    const user = await User.findOne({email});

    if(!user) throw new ApiError(404, "User not found");
    
    const isPasswordCorrect = await bcrypt.compare(password, String(user.password));

    if(!isPasswordCorrect){
        throw new ApiError(403, "Invalid password");
    }

    const userSent = await User.findById(user._id).select("-password").populate("todos");

    if(!userSent) throw new ApiError(404, "User not found");

    const token = jwt.sign({id:userSent._id.toString()}, config.jwtSecret);

    return res.cookie("token", token).status(200).json(
        new ApiResponse(200, {user:userSent, token}, "User created sucessfully")
    );
});

export const signout = asyncHandler(async(req:Request, res:Response)=>{
    return res.status(200)
    .clearCookie("token")
    .json(
        new ApiResponse(200, {}, "User signed out sucessfully")
    );
});

export const getUserByToken = asyncHandler(async(req:Request, res:Response)=>{
    const user = req.user;
    const userSent = await User.findById(user!.id);
    return res.status(200).json(
        new ApiResponse(200, {user:userSent}, "User sent sucessfully")
    );
})
