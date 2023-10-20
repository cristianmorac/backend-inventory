const {Router} = require('express');
const { getPeriferico, createPeriferico } = require('../controllers/periferico');
const { validarJWT, validarRol } = require('../middlewares');

const router = Router()

//validar todas las rutas con JWT
router.use(validarJWT)

// obtener laptops
    router.get('/', getPeriferico)

// crear laptop
router.post('/create',[
    // validar rol admin
    validarRol,
], createPeriferico)


module.exports = router