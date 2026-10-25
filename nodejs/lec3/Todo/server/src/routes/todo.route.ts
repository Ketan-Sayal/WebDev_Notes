import express from "express";
import { create, getAll } from "../controllers/todo.controller.js";

const router = express.Router();

router.route("/")
      .get(getAll)
      .post(create)

export default router;