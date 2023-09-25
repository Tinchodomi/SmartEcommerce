import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo"; //conectar con base de datos mongo
import "dotenv/config";
import userRouter from "./routes/users.routes.js";
import sessionRouter from "./routes/sessions.routes.js";
import mongoose from "mongoose";
//import FileStore from "session-file-store";

const app = express();
const PORT = 4000;
const localHost = "http://localhost:4000";

mongoose.connect(process.env.MONGO_URL)
  .then(()=>{
    console.log('Mongo conectado')

  } )
  .catch( (err)=> console.log(err))
app.listen(PORT, () => {
  console.log(`Conectado a servidor ${localHost}/login`);
});

app.use(express.json());
app.use('/api/users', userRouter)
app.use('/api/sessions',sessionRouter)
//const fileStore = FileStore(session);

app.use(
  session({
    //store: new fileStore({path:'./sessions', ttl: 1000, retries:1}),
     store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 90, // time to live, tiempo que dura la session
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

function auth(req, res, next) {
  console.log(req.session.email);
  if (req.session.email == "admin@admin.com") {
    return next();
  }
  return res.send("no tenes acceso");
}

app.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Has entrado ${req.session.counter} veces a la pagina`);
  } else {
    req.session.counter = 1;
    res.send(`Hola por primera vez`);
  }
});

app.get("/login", (req, res) => {
  const { email, password } = req.body;

  req.session.email = email;
  req.session.password = password;
  return res.send("Usuario logueado");
});

app.get("/admin", auth, (req, res) => {
  res.send("Sos admin");
});

app.get("logout", (req, res) => {
  try {
    req.session.destroy();

    res.send("loged out");
  } catch (error) {
    res.status(400).send({ error: `Error al termianr sesion: ${error}` });
  }
});
