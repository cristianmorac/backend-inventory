const {Router} = require('express');
const { createLaptop, getLaptop } = require('../controllers/laptop');
const { validarJWT, validarRol } = require('../middlewares');

const router = Router()

//validar todas las rutas con JWT
router.use(validarJWT)

// obtener laptops
    router.get('/', getLaptop)

// crear laptop
router.post('/create',[
    // validar rol admin
    validarRol,
], createLaptop)


module.exports = router