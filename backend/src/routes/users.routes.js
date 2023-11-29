import { Router } from "express";
import passport from "passport";
import { getUsers, postUser } from "../controllers/users.controller.js";
import { sendRecoveryEmail } from "../config/nodemailer.js";
import crypto from "crypto";
import logger from "../utils/loggers.js";
import { getUser } from "../controllers/users.controller.js";
import userModel from "../models/users.model.js";
import { validatePassword ,createHash } from "../utils/bcrypt.js";
import { hash } from "bcrypt";
import { ifError } from "assert";
import { error } from "console";


const userRouter = Router();

const recoveryLinks = {};

userRouter.get("/", getUsers);
userRouter.get('/:id', getUser)
userRouter.post("/", passport.authenticate("register"), postUser);
userRouter.post("/password-recovery", async (req, res) => {
  const { email } = req.body;
  try {
    const token = crypto.randomBytes(20).toString("hex");
    recoveryLinks[token] = { email, timestamp: Date.now() };

    const recoveryLink = `http://localhost:4000/api/users/reset-password/${token}`;
    sendRecoveryEmail(email, recoveryLink);
    res.status(200).send(`Correo de recuperacion enviado`);
  } catch (error) {
    res.status(500).send(`Error al recuperar contraseña`)
  }
});
userRouter.post('/reset-password/:token', async (req,res)=> {
  const {token} = req.params
  const {newPassword, email} = req.body

  const user = await userModel.findOne({ email: email });
  const arePasswordsEqual = validatePassword(newPassword, user.password);

  try {
    
    if (arePasswordsEqual == false) {

        user.password = newPassword
        const hashPassword = createHash(user.password)
        user.password = hashPassword
        user.save()
        
       
    } else {

       return res.status(400).send({mensaje: 'Elige otra contraseña'})
    }

    const linkData = recoveryLinks[token]
    
    if(linkData && Date.now() - linkData.timestamp <= 3600000){
    
      
      delete recoveryLinks[token]
      res.status(200).send({mensaje: 'Contraseña modificada correctamente'})
      
    }else{
      res.status(400).send({mensaje:'Token invalido o expirado, intente nuevamente'})
    }
  } catch (error) {
    
    res.status(400).send({error:'Error al cambiar contraseña'})
  }
})


export default userRouter;