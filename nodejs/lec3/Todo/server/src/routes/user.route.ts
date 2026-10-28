import express from "express";
import {getUserByToken, signin, signout, signup} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/isLoggedin.middleware.js";

const router = express.Router();


router.route("/signin").post(signin);
router.route("/signout").post(signout);
router.route("/signup").post(signup);
router.route("/token").get(isLoggedIn, getUserByToken);

export default router;