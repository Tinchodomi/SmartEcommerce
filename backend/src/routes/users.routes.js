import { Router } from "express";
import passport from "passport";
import { getUsers, postUser } from "../controllers/users.controller.js";
import CustomError from "../errors/CustomError.js";
import { generateUserErrorInfo } from "../errors/info.js";
import EErrors from "../errors/Eerrors.js";



const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.post ('/', passport.authenticate('register') , postUser)

export default userRouter;
