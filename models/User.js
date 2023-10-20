const { Schema, model} = require('mongoose');

const UserSchema = Schema({
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },
    laptop: {
        type: Schema.Types.ObjectId,
        ref: 'laptop',
    },
    teclado: {
        type: Schema.Types.ObjectId,
        ref: 'periferico',
    },
    mouse: {
        type: Schema.Types.ObjectId,
        ref: 'periferico',
    },
    monitor: {
        type: Schema.Types.ObjectId,
        ref: 'monitor',
    },
    rol: {
        type: String,
        default: 'ADMIN_ROLE'
    },
    state: {
        type: Boolean,
        default: true
    },
    
    creado: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', UserSchema);