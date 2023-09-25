import local from "passport-local"; ///estrategia
import passport from "passport";
import { createHash, validatePassword } from "../utils/bcrypt.js";
import userModel from "../models/users.model.js";
import GithubStrategy from "passport-github2";
//defino la estrategia a utilizar

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, passport, done) => {
        //defino como voy a registrar el usuario
        const { first_name, last_name, email, password, age } = req.body;

        try {
          const user = await userModel.findOne({ email: email });
          if (user) {
            return done(null, false);
          }

          const passwordHash = createHash(password);
          const userCreate = await userModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: passwordHash,
            age: age,
          });
          return done(null, userCreate);
        } catch (error) {
          return done(error);
        }
      }
    )
  ); //cierre de passport.use

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken)
          console.log(refreshToken)
          const user = await userModel.findOne({email:profile._json.email});
          if (user) {
            done(null, false);
          } else {
            const userCreate = await userModel.create({
              first_name: profile._json.name,
              last_name: " ",
              email: profile._json.email,
              age: 18, //edad por defecto
              password: "password",
            });
            done(Null, userCreate);
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //iniciar sesion del usuario
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  //cerrar sesion del usuario
  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email: email });
          if (!user) {
            done(null, false);
          }

          if (validatePassword(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

export default initializePassport;
