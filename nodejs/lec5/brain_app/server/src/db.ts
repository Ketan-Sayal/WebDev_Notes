import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

mongoose.connect(`${process.env.MONGODB_URI}`);

const UserSchema = new mongoose.Schema({
    username:String,
    password:String
});

const  ContentSchema = new mongoose.Schema({
    type:[{
        type:String,
        default:[]
    }],
    link:String,
    title:String,
    description:{
        type:String
    },
    tags:[{
        type:String,
        default:[]
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});

export const User = mongoose.model('User', UserSchema);
export const Content = mongoose.model('Content', ContentSchema);