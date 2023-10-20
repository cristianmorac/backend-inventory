const { Schema, model} = require('mongoose');

const EventSchema = Schema({
    
    title: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        required:true
    },

    start: {
        type: Date,
        required:true
    },

    end: {
        type: Date,
        required:true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }
});

// sobreescribir ToJson
EventSchema.method('toJSON', function() {
    const {__v, _id, ...object} =this.toObject();
    // modificar _id = id
    object.id = _id;
    // devolver el objeto sin __v
    return object
})

module.exports = model('Event', EventSchema);