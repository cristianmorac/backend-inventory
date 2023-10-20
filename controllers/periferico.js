const { response } = require('express');
const Periferico = require('../models/perifericos');
const dateLegible = require('../helpers/date-legible');


const getPeriferico = async (req, res = response) => {
    try {

        const periferico = await Periferico.find()
        res.json({
            ok: true,
            periferico
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const createPeriferico = async (req, res = response) => {

    // 
    try {

        const uid = req.uid
        const periferico = new Periferico(req.body)
        periferico.createDate = dateLegible()
        periferico.userCreate = uid
        await periferico.save()

        res.json({
            ok: true,
            msg: 'laptop creada satisfactoriamente'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

module.exports = {
    getPeriferico, createPeriferico
}