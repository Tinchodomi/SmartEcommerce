//imports de node_modules
import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";

//imports de modulos
import initializePassport from "./config/passport.js";
import cookieParser from "cookie-parser";
import router from "./routes/index.routes.js";


//server
const app = express();
const PORT = 4000;
const localhost = "http://localhost:4000";

const MONGO_URL = "mongodb+srv://tinchodomi:Martin1991@cluster0.jghkycb.mongodb.net/SmartEcommerce"
//mongoose
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Mongo conectado");
  })
  .catch((err) => {
    console.log("Error al conectarse a Mongo", err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 90,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use(router)

//listen server
app.listen(PORT, () => {
  console.log(`Server on port:${localhost}`);
});
