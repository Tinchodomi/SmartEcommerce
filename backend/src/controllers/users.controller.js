import userModel from "../models/users.model.js";



export const getUsers = async (req,res)=>{

    const users = await userModel.find()

    if (users) {
        return res.status(200).send(users)
    }

}



export const postUser = async( req,res)=>{

    try {
        if(!req.user){
          res.status(200).send({mensaje: 'Usuario ya existe'})
        }
        return res.status(200).send('Usuario creado')
      } catch (error) {
        res.status(500).send({mensaje:'Error al crear usuario '})
      }

}