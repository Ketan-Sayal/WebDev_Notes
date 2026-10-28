import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
    title:String,
    task:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    completed:{
        type:Boolean,
        default:false
    }
});

const Todo = model("Todo", TodoSchema);

export {Todo};