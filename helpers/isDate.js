const moment = require('moment');


const isDate = ( value ) => {

    // validar si value no existe
    if (!value) {
        return false;
    }

    const fecha = moment(value)

    //validar si es una fecha correcta
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isDate }