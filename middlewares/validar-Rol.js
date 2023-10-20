const { response } = require('express')
const User = require('../models/User')

const validarRol = async (req, res= response, next) => {
    const user = await User.findById(req.uid);
        if ( user.rol !== "ADMIN_ROLE") {
            return res.status(400).json({
                ok: false,
                msg: 'No tiene privilegios para realizar la acción'
            })
        }
    next()
}

module.exports = { validarRol }