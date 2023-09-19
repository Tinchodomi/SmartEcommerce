import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";//conectar con base de datos mongo
import "dotenv/config"
//import FileStore from "session-file-store";


const app = express();
const PORT = 4040;
const localHost = "http://localhost:4040";

app.listen(PORT, () => {
  console.log(`Conectado a servidor ${localHost}`);
});

app.use(express.json());
//const fileStore = FileStore(session);

app.use(
  session({
    //store: new fileStore({path:'./sessions', ttl: 1000, retries:1}),
    store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    ttl: 90 // time to live, tiempo que dura la session
 
   }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);


function auth(req,res,next){
  console.log(req.session.email)
  if(req.session.email == 'admin@admin.com'){
    return next()
  }
  return res.send('no tenes acceso')

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

  if (email === "admin@admin.com" && password === "1234") {
    req.session.email = email
    req.session.password = password
    return res.send("Usuario logueado");
  } 
  
  return res.send("Usuario no existe");
  
});


app.get('/admin',auth, (req,res)=>{
        res.send('Sos admin')
})

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
    else res.redirect("/");
  });
});




