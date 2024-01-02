//imports de node_modules
import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import cors from 'cors'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import { __dirname } from "./path.js";
import cookieParser from "cookie-parser";


//imports de own modules
import initializePassport from "./config/passport.js";
import router from "./routes/index.routes.js";
import logger from "./utils/loggers.js";


//server
const app = express();
const PORT = 4000;
const localhost = "http://localhost:4000";

const withelist = ['http://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
      if (withelist.indexOf(origin) != -1 || !origin) { //Existe dentro de whitelist
          callback(null, true)
      } else {
          callback(new Error("Acceso denegado"))
      }
  }
}

app.use(cors(corsOptions))

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    logger.info('Conectado a Mongo DB')
  })
  .catch((err) => {
   logger.info("Error al conectarse a Mongo", err);
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


//swagger
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Documentacion Backend',
      description:'API coderhouse backend'
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`], // files containing annotations as above
};

const specs = swaggerJsdoc(options)
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))


//listen server
app.listen(PORT, () => {
  logger.http(`${localhost}/api/users`);
  logger.http(`${localhost}/api/products`)
  logger.http(`${localhost}/api/carts`)
  logger.http(`${localhost}/api/tickets`)
  logger.http(`${localhost}/api/mockingproducts`)
  logger.http(`${localhost}/apidocs`)

});
