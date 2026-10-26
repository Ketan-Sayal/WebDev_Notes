import express from "express";
import {signin, signout, signup} from "../controllers/user.controller.js";

const router = express.Router();


router.route("/signin").post(signin);
router.route("/signout").post(signout);
router.route("signup").post(signup);

export default router;