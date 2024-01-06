import bcrypt from "bcrypt";
import "dotenv/config";

//encriptar contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(process.env.SALT)));
//const hashPassword = createHash("coderhouse");
//console.log(hashPassword)

//validar contraseña
export const validatePassword = (passwordSend, passwordBDD) =>
  bcrypt.compareSync(passwordSend, passwordBDD);
//console.log(validatePassword('coderhouse', hashPassword))
