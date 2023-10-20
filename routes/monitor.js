const {Router} = require('express');
const { getMonitor, createMonitor } = require('../controllers/monitor');
const { validarJWT, validarRol } = require('../middlewares');

const router = Router()

//validar todas las rutas con JWT
router.use(validarJWT)

// obtener laptops
    router.get('/', getMonitor)

// crear laptop
router.post('/create',[
    // validar rol admin
    validarRol,
], createMonitor)


module.exports = router