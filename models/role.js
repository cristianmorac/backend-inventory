const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true,'Rol Obligatorio']
    }
})

module.exports = model('Role',RoleSchema)