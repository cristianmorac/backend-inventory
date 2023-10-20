const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
    // Crear promesa para generar el JWT
    return new Promise((resolve, reject) => {
        const token = process.env.SECRET_JWT_SEED
        const payload = { uid, name };
        jwt.sign(payload, token, {
            // tiempo de expiracion
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puede generar el token')
            }

            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}