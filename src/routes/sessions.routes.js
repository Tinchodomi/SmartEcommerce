import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/errorMessg.js";

const sessionRouter = Router();

sessionRouter.post(
  "/login",
  passport.authenticate("login"),
  async (req, res) => {
    /* const { email, password } = req.body;

  try {
   
    if (req.session.login) {
      res.status(200).send({ resultado: "Ya estas logueado", message: user });
    }

    const user = await userModel.findOne({ email: email });
    
    if (user) {
      if (validatePassword(password,user.password)) {
        req.session.login = true;
        res.redirect(`/products?info=${user.first_name}`)
      } else {
        res.status(401).send({ resultado: "Unauthorized"});
      }
    } else {
      res.status(404).send({ resultado: "Not found" });
    }

  
  } catch (error) {
      res.status(400).send({ error: `Error en login ${error}` });
    } */

    try {
      if (!req.user) {
        return res.status(401).send({ mensaje: "User invalido" });
      }

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      };

      res.status(200).send({ payload: req.user });
    } catch (error) {
      res.status(500).send({ mensaje: "Error al iniciar sesion" });
    }
  }
);

sessionRouter.get(
  "/logout",
  async (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }

  res.redirect("/login");
});

///github
sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {
    res.status(200).send({ mensaje: "Usuario Creado" });
  }
);

sessionRouter.get(
  "/githubSessions",
  passport.authenticate("github"),
  async (req, res) => {}
);

sessionRouter.get(
  "/testJWT",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.status(200).send({ mensaje: req.user });
  }
);

sessionRouter.get(
  "/current",
  passportError("jwt"),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

export default sessionRouter;
