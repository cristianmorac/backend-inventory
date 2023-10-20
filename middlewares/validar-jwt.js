const { response } = require('express');
const jwt = require('jsonwebtoken')

const validarJWT = (req, res=response, next) => {
    
    // pedir x-token en los headers
    const token = req.header('x-token')

    // validar el token
    if (!token) {
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        })
    }

    try {
        // desestructurar el payload
        const {uid, name} = jwt.verify(
            token, process.env.SECRET_JWT_SEED
        );
        
        // enviar parametros por el require
        req.uid = uid
        req.name = name

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no válido'
        })
    }


    next()
}

module.exports = {
    validarJWT
}