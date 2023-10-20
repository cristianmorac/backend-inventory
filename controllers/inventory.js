const { response } = require('express');
const Laptop = require('../models/laptop');
const Monitor = require('../models/monitor')
const Perifericos = require('../models/perifericos')
const User = require('../models/User')


const getInventory = async (req, res = response) => {
    try {

        const laptops = await Laptop.find({asset:true}).count()
        const monitor = await Monitor.find({asset:true}).count()
        const teclado = await Perifericos.find({asset:true, type: "teclado"}).count()
        const mouse = await Perifericos.find({asset:true, type: "mouse"}).count()
        const user = await User.find({state:true, rol:'USER_ROLE'}).count()
        res.json({
            ok: true,
            laptops,
            monitor,
            teclado,
            user,
            mouse

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = getInventory