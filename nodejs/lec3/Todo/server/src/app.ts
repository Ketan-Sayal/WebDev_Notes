import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

import todoRouter from "./routes/todo.route.js";
import userRouter from "./routes/user.route.js";
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);


app.use(errorMiddleware);
export {app};