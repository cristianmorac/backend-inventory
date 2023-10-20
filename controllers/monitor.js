const { response } = require('express');
const Monitor = require('../models/monitor');
const dateLegible = require('../helpers/date-legible');

const getMonitor = async (req, res = response) => {
    try {

        const monitor = await Monitor.find()
        const count = await Monitor.count()
        res.json({
            ok: true,
            monitor,
            count
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const createMonitor = async (req, res = response) => {

    // 
    try {

        const uid = req.uid
        const monitor = new Monitor(req.body)
        monitor.createDate = dateLegible()
        monitor.userCreate = uid
        await monitor.save()

        res.json({
            ok: true,
            msg: 'monitor creada satisfactoriamente'
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
    getMonitor, createMonitor
}