const { Schema, model } = require('mongoose');

const PerifericoSchema = Schema({
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    userCreate: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createDate:{
        type: String,
    },
    asset: {
        type: Boolean,
        default: true
    }
})

PerifericoSchema.method('toJSON', function() {
    const {__v, _id, ...object} =this.toObject();
    // modificar _id = id
    object.id = _id;
    // devolver el objeto sin __v
    return object
})

module.exports = model('periferico',PerifericoSchema)