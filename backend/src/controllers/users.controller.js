import userModel from "../models/users.model.js";
import logger from "../utils/loggers.js";
export const getUsers = async (req,res)=>{

    const users = await userModel.find()
    logger.info('Solicitaste todos los usuarios de la DB')
    if (users) {
        return res.status(200).send(users)
    }

}


export const getUser = async (req,res)=>{

  const { id } = req.params

  try {
    
    const user = await userModel.findById(id)

    if (user) {
      return res.status(200).send(user)
  }

  res.status(404).send({ error: "User no encontrado" })

} catch (error) {
  res.status(500).send({ error: `Error en consultar user ${error}` })
}
}

export const postUser = async( req,res)=>{

    try {

      const { first_name, last_name, email, age, password } = req.body
      if(!first_name || !last_name || !email || !age || !password) {
          CustomError.createError({
              name: 'User creation error',
              cause: generateUserErrorInfo,
              message:'Error trying create user',
              code: EErrors.INVALID_USER_ERROR
          })
      } 
        if(!req.user){
          res.status(200).send({mensaje: 'Usuario ya existe'})
        }
        return res.status(200).send('Usuario creado')
      } catch (error) {
        res.status(500).send({mensaje:'Error al crear usuario '})
      }

}