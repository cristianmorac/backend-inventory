const { response } = require('express')
const bycript = require('bcryptjs')
const User = require('../models/User')
const Laptop = require('../models/laptop')
const Periferico = require('../models/perifericos')
const Monitor = require('../models/monitor')
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
    try {

        // obtiene el email del body
        const { email, password, monitorAssign } = req.body

        // validaciones si el email existe
        let searchEmail = await User.findOne({ email })

        // si existe envia un error
        if (searchEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya un user tiene ese correo'
            })
        }
        // crear un nuevo usuario
        const user = new User(req.body)

        // saltos para la contraseña
        const salt = bycript.genSaltSync();
        // encriptar
        user.password = bycript.hashSync(password, salt)

        // asignar una laptop
        let laptop = await Laptop.findOne({ asset: true })
        // asignar un teclado
        let teclado = await Periferico.findOne({ asset: true, type: 'teclado' })
        // asignar un mouse
        let mouse = await Periferico.findOne({ asset: true, type: 'mouse' })

        if (monitorAssign) {
            // asignar monitor
            let monitorAssign = await Monitor.findOne({ asset: true })
            if (!monitorAssign) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No se puede crear el user falta equipos para asignación'
                })
            }
            user.monitor = monitorAssign.id
            monitorAssign.asset = false
            await monitorAssign.save()
        }

        if (!laptop && !teclado && !mouse) {
            return res.status(400).json({
                ok: false,
                msg: 'No se puede crear el user falta equipos para asignación'
            })
        }

        assign = [laptop, teclado, mouse]

        const assignEquip = async (assign, user) => {
            assign.map(async (add) => {
                let type = add.type
                user[type] = add.id
                add.asset = false
                await add.save()
            })
            
            await user.save()
        }

        await assignEquip(assign, user)

        // Generar JWT
        const token = await generateJWT(user.id, user.fullname)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.fullname,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se registro hable con el Admin'
        })
    }
}

const login = async (req, res = response) => {

    try {

        // obtiene el email del body
        const { email, password } = req.body

        // validaciones si el email existe
        let user = await User.findOne({ email })

        // si existe envia un error
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'user not exist with email'
            })
        }

        // validar password
        const validPassword = bycript.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: '´password incorrect'
            })
        }

        // Generar JWT
        const token = await generateJWT(user.id, user.fullname)

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.fullname,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el Admin'
        })
    }
}

const revalidarToken = async (req, res = response) => {

    // extraer lo datos enviados del payload en el renew
    const { uid, name } = req

    // generar un nuevo JWT
    const token = await generateJWT(uid, name)

    res.json({ ok: true, token })
}

module.exports = {
    createUser, login, revalidarToken
}