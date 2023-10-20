const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    try {
        // populate: muestra información del usuario
        const events = await Event.find().populate('user', 'fullname email')
        res.json({
            ok: true,
            events
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const createEvent = async (req, res = response) => {

    // 
    try {
        const event = Event(req.body);
        // enviar el id del usuario que esta logueado
        event.user = req.uid        
        eventSave = await event.save()

        res.json({
            ok: true,
            eventSave
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId);

        // validar si el id existe
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        // validar que sea el mismo usuario que creo el evento
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene privilegio de editar el evento'
            })
        }

        const newEvent = { ...req.body, user: uid }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            evento: eventUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }
}

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id
    const uid = req.uid

    try {

        const event = await Event.findById(eventId);

        // validar si el id existe
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        // validar que sea el mismo usuario que creo el evento
        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene privilegio de editar el evento'
            })
        }

        // obtener objeto a eliminar
        const newEvent = { ...req.body, user: uid }

        // eliminar evento
        await Event.findByIdAndDelete(eventId, newEvent, { new: true })

        res.json({
            ok: true,
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
    getEvents, createEvent, updateEvent, deleteEvent
}