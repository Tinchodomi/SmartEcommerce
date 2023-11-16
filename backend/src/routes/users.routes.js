import { Router } from "express";
import passport from "passport";
import { getUsers, postUser } from "../controllers/users.controller.js";



const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.post ('/', passport.authenticate('register') , postUser)

export default userRouter;
