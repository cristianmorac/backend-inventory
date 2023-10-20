const { response } = require('express');
const Laptop = require('../models/laptop');
const dateLegible = require('../helpers/date-legible');


const getLaptop = async (req, res = response) => {
    try {

        const laptop = await Laptop.find()
        res.json({
            ok: true,
            laptop
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const createLaptop = async (req, res = response) => {

    // 
    try {
        const uid = req.uid
        const laptop = new Laptop(req.body)
        laptop.createDate = dateLegible()
        laptop.userCreate = uid
        await laptop.save()

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
    createLaptop, getLaptop
}