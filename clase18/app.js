import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import "dotenv/config"

const app = express();
const PORT = 8080;
const localHost = "http://localhost:8080";
const minute = "60000"; //ms;

//midlewares
app.use(cookieParser("mysecret"));
app.use(express.json())

///creacion de cookies
app.get("/setCookie", (req, res) => {
  res
    .cookie("Cookie", "Esta es mi Cookie", { maxAge: minute, signed: true })
    .send("Cookie creada");
});

app.get("/getCookie", (req, res) => {
  res.send(req.signedCookies);
});

app.listen(PORT, () => {
  console.log(`Server on port ${localHost}/setCookie`);
  console.log(`Server on port ${localHost}/getCookie`);
  console.log(`Server on port ${localHost}/session`);
});

app.use(
  session({
    secret: process.env.MONGO_URL,
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
  } else {
    return res.send("Usuario no existe");
  }
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
