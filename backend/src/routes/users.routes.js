import { Router } from "express";
import passport from "passport";
import { getUsers, postUser } from "../controllers/users.controller.js";



const userRouter = Router();

userRouter.get('/', getUsers)
userRouter.post ('/',  passport.authenticate('register') , postUser)


/* userRouter.post("/", passport.authenticate('register') ,async (req, res) => {
 
  /*  const { first_name, last_name, email, password, rol, age } = req.body;
  let user;
  try {
    const hashPassword = createHash(password);
    if (email == "admin@admin.com" && password == "admin") {
      user = await userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
        age: age,
        rol: "admin",
      });
    } else {
      user = await userModel.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: hashPassword,
        age: age,
        rol:rol
      });
    }

    res.redirect("/login");
  } catch (error) {
    res.status(400).send({ error: `Error en crear usuario: ${error}` });
  } 

    try {
      if(!req.user){
        res.status(200).send({mensaje: 'Usuario ya existe'})
      }
      return res.status(200).send('Usuario creado')
    } catch (error) {
      res.status(500).send({mensaje:'Error al crear usuario '})
    }


});
 */



export default userRouter;
