import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messageErrors.js";
import { generateToken } from "../utils/jwt.js";
const sessionRouter = Router()


import CustomError from '../services/errors/customError.js';
import EErrors from '../services/errors/enums.js';
import { generateUserErrorInfo } from "../services/errors/info.js";


sessionRouter.post('/login', passport.authenticate('login'), async (req, res) => {
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
        res.status(200).send({ payload: req.user })
    } catch (error) {
        res.status(500).send({ mensaje: `Error al iniciar sesion ${error}` })
    }
})

sessionRouter.post('/register', (req, res, next) => {
    const { first_name, last_name, email } = req.body;
    try {
        if (!last_name || !first_name || !email) {
            CustomError.createError({
                name: "User creation error",
                cause: generateUserErrorInfo({ first_name, last_name, email }),
                message: "One or more properties were incomplete or not valid.",
                code: EErrors.INVALID_USER_ERROR
            });
        }
        next();
    } catch (error) {
        next(error);
    }
}, passport.authenticate('register'), register);

sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: true }), async (req, res) => {
    res.status(200).send({ mensaje: req.user })
    req.session.user = {
        first_name: req.user.user.first_name,
        last_name: req.user.user.last_name,
        age: req.user.user.age,
        email: req.user.user.email
    }
})

sessionRouter.get('/current', passportError('jwt'), authorization('user'), (req, res) => {
    res.send(req.user)
})

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    res.status(200).send({ mensaje: 'Usuario creado' })
})

sessionRouter.get('/githubSession', passport.authenticate('github'), async (req, res) => {
    req.session.user = req.user
    res.status(200).send({ mensaje: 'Session creada' })
})

sessionRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    res.clearCookie('jwtCookie')
    res.status(200).send({ resultado: 'Login eliminado' })
})

export default sessionRouter