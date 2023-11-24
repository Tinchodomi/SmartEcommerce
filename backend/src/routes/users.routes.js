import { Router } from "express";
import passport from "passport";
import { getUsers, postUser } from "../controllers/users.controller.js";
import { sendRecoveryEmail } from "../config/nodemailer.js";
import crypto from "crypto";
import logger from "../utils/loggers.js";
import { getUser } from "../controllers/users.controller.js";

const userRouter = Router();

const recoveryLinks = {};

userRouter.get("/", getUsers);
userRouter.get('/:id', getUser)
userRouter.post("/", passport.authenticate("register"), postUser);
userRouter.post("/password-recovery", (req, res) => {
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
userRouter.post('/reset-password/:token', (req,res)=>{
  const {token} = req.params
  const {newPassword, oldPassword} = req.body
  
  try {
    
    const linkData = recoveryLinks[token]
    if(linkData && Date.now() - linkData.timestamp <= 3600000){
      
      const {email} = linkData
      
      logger.info(email)
      logger.info(newPassword)
      logger.info(oldPassword)
      
      delete recoveryLinks[token]
      res.status(200).send(`Contraseña modificada correctamente`)
      
    }else{
      res.status(400).send(`Token invalido o expirado, intente nuevamente`)
    }
  } catch (error) {
    res.status(400).send(`Error al cambiar contraseña`, error)
  }
})


export default userRouter;