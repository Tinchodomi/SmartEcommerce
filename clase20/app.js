//imports de node_modules
import "dotenv/config";
import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";
import passport from "passport";
import  initialize  from "passport";

//imports de modulos
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/carts.routes.js";
import userRouter from "./routes/users.routes.js";
import sessionRouter from "./routes/sessions.routes.js";
import productModel from "./models/products.model.js";
import initializePassport from "./config/passport.js";

//path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//server
const app = express();
const PORT = 4000
const localhost = "http://localhost:4000";


//mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo conectado");
  })
  .catch((err) => {
    console.log("Error al conectarse a Mongo", err);
  });


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
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

initializePassport()
app.use(passport.initialize())
app.use(passport.session())



//routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('/api/users', userRouter)
app.use('/api/sessions',sessionRouter)



//handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));


app.get('/singin', async (req,res)=>{
    
  res.render('singin')
})


app.get("/login", async (req, res) => {
  
  res.render("login");
});

app.get('/products', async (req, res) => {
  
  const products = await productModel.find().lean();
  const info = req.query.info
  
  res.render('products', {
        rutaJS: "js/products.js",
        products,
        info,

  });
});

//listen server
app.listen(PORT, () => {
  console.log(`Server on port:${localhost}/singin `);
  console.log(`Server on port:${localhost}/login `);
  console.log(`Server on port:${localhost}/products `);
  console.log(`Server on port:${localhost}/api/sessions/github `);
});
