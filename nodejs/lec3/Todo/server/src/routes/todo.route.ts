import express from "express";
import { create, deleteTodo, getAll, update } from "../controllers/todo.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedin.middleware.js";

const router = express.Router();

router.use(isLoggedIn);

router.route("/")
      .get(getAll)
      .post(create);

router.route("/:id")
      .patch(update)
      .delete(deleteTodo);

export default router;