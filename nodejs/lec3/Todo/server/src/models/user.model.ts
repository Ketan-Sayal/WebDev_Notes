import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String
    },
    email:String,
    password:String,
    todos:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:"Todo"
        }],
        default:[]
    }
});

const User = model("User", userSchema);

export {User};