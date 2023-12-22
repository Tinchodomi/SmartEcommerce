import { Router } from "express";
import passport from "passport";
import { passportError, authorization } from "../utils/messageErrors.js";
import { sessionLogin, sessionLogout, sessionRegister, testJWT } from "../controllers/sessions.controller.js";

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'),sessionLogin)
sessionRouter.post('/register', passport.authenticate('register'),sessionRegister)
sessionRouter.get('/testJWT', passport.authenticate('jwt', { session: true }), testJWT )
sessionRouter.get('/current', passportError('jwt'), authorization('user'), (req, res) => {res.send(req.user)})
sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {res.status(200).send({ mensaje: 'Usuario creado' })})
sessionRouter.get('/githubSession', passport.authenticate('github'), async (req, res) => {req.session.user = req.user, res.status(200).send({ mensaje: 'Session creada' })})
sessionRouter.get('/logout', sessionLogout)
export default sessionRouter