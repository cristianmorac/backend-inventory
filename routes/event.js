const {Router} = require('express');

// import para realizar validaciones
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate');

const { validarJWT } = require('../middlewares/validar-jwt')

const {getEvents,createEvent,updateEvent,deleteEvent} = require('../controllers/event');
const { esRolAdmin } = require('../helpers/db-validators');
const { validarRol } = require('../middlewares/validar-Rol');
const router = Router()

//validar todas las rutas con JWT
router.use(validarJWT)
// obtener eventos
router.get('/', getEvents)

// crear evento
router.post('/', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    // validar fechas
    check('start', 'fecha de inicio es obligatoria').custom(isDate),
    check('end', 'fecha de finalización es obligatoria').custom(isDate),
    // validar rol admin
    validarRol,
    validarCampos
],createEvent)

// Actualizar evento
router.put('/:id', validarRol, updateEvent)

// Borrar evento
router.delete('/:id', validarRol, deleteEvent)

module.exports = router;