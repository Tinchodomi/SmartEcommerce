import nodemailer from 'nodemailer'
import logger from '../utils/loggers.js'


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tinchodomi@gmail.com',
        pass: process.env.GMAILPASS,
        authMethod: 'LOGIN'
    }
})


//Funciones de nodemailer

export const sendRecoveryEmail = (email, recoveryLink) =>{
    const emailOptions = {
        from: 'TEST tincho tinchodomi@gmail.com',
        to: email,
        subjet:'Link de recuperar contraseña',
        text:`Por favor haz click en el siguiente enlace ${recoveryLink}`
    }

    transporter.sendMail(emailOptions, (error,info)=>{
        if(error){
            logger.error('Error al recuperar contraseña')
        }else{
            logger.info('Email enviado correctamente')
        }
    })
}

