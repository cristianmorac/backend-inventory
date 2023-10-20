const {Router} = require('express');
const { createUser, login, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const {esRolValido} = require('../helpers/db-validators')
const router = Router()

router.post('/new',

// validaciones en el endpoint
[   
    // nombre obligatorio
    check('fullname', 'name requerido').not().isEmpty(),
    // email formato valido y obligatorio
    check('email', 'email requerido').isEmail(),
    // password obligatorio y tener una longitud de 6 caracteres
    check('password', 'pass mayor a 5 caracteres').isLength({min:6}),
    // si el Rol existe en la base de datos
    // check('rol').custom(esRolValido),
    // validar middleware personalizado
    validarCampos
], 
// controller
createUser)

router.post('/',[

    // email formato valido y obligatorio
    check('email', 'email requerido').isEmail(),
    // password obligatorio y tener una longitud de 6 caracteres
    check('password', 'pass mayor a 5 caracteres').isLength({min:6}),
    // validar middleware personalizado
    validarCampos    

], login)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router