const json = require('express').json
const { Auditorium } = require('../models')

async function getAuditoriums(req, res) {
    const auditoriums = await Auditorium.findAll({
        order: [['name', 'ASC']]
    })
    res.json(auditoriums)
}

async function getAuditorium(req, res) {
    const { theater_id } = req.params
    const auditorium = await Auditorium.findAll({
        where: { theater_id: theater_id }
    })
    res.json(auditorium)
}

async function createAuditorium(req, res) {
    const { name, capacity, theater_id } = req.body
    const auditorium = await Auditorium.create({ name, capacity, theater_id })
    res.json(auditorium)
}

async function updateAuditorium(req, res) {
    const { id } = req.params
    const data = req.body
    const auditorium = await Auditorium.findByPk(id)
    if (!auditorium) return res.status(404).json({ message: 'auditorium not found' })
    await auditorium.update(data)
    res.json(auditorium)
}

async function deleteAuditorium(req, res) {
    const { id } = req.params
    const auditorium = await Auditorium.findByPk(id)
    if (!auditorium) return res.status(404).json({ message: 'auditorium not found' })
    await auditorium.destroy()
    res.json(auditorium)
}

module.exports = {
    getAuditoriums,
    getAuditorium,
    createAuditorium,
    updateAuditorium,
    deleteAuditorium
}