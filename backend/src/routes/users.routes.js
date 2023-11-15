import { Router } from "express";
import passport from "passport";
import { getUsers, postUser } from "../controllers/users.controller.js";
import CustomError from "../errors/CustomError.js";
import { generateUserErrorInfo } from "../errors/info.js";
import EErrors from "../errors/Eerrors.js";



const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.post ('/', (req,res)=>{

    if(!req.user){
        CustomError.createError({
            name: 'user creation error',
            cause: generateUserErrorInfo,
            message:'Error trying create user',
            code: EErrors.INVALID_USER_ERROR
        })
    }


},  passport.authenticate('register') , postUser)

export default userRouter;
