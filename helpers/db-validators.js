const Role = require('../models/role');
const User = require('../models/User');

const esRolValido = async (rol='') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta en la DB`)
    }
}

module.exports = { esRolValido }