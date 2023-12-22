import userModel from "../models/users.model.js"
export const sessionLogin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send({ mensaje: "Invalidate user" })
        }
        
       

        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email
            
        }

        
        const token = generateToken(req.user)
        res.cookie('jwtCookie', token, {
            maxAge: 43200000
        })

        console.log(token)

        const user = await userModel.findOne({ email: req.user.email })
        console.log(user.email)
        user.last_connection = Date.now()
        await user.save()

        
        res.status(200).send({ payload: req.user })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }}


export const sessionRegister =  async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).send({ mensaje: 'Usuario ya existente' })
        }
        return res.status(200).send({ mensaje: 'Usuario creado' })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al crear usuario ${error}` })
    }
}

export const testJWT = async (req, res) => {
    res.status(200).send({ mensaje: req.user })
    req.session.user = {
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email
    }
}

export const sessionLogout = async (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    res.status(200).send({ resultado: 'Login eliminado' })
}
