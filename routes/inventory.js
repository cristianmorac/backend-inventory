const {Router} = require('express');
const { createLaptop, getLaptop } = require('../controllers/laptop');
const { validarJWT, validarRol } = require('../middlewares');
const getInventory = require('../controllers/inventory');

const router = Router()

//validar todas las rutas con JWT
router.use(validarJWT)

// obtener laptops
    router.get('/', getInventory)

module.exports = router