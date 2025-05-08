const json = require('body-parser')
const { Theater } = require('../models')

async function getTheaters(req, res) {
    try {
        const theater = await Theater.findAll({
            order: [
                ['name', 'ASC'],
                ['updatedAt', 'DESC']
            ]
        })
        res.status(200).json(theater)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error get theaters' })
    }
}

async function getTheater(req, res) {
    try {
        const { id } = req.params
        const theater = await Theater.findByPk(id)
        res.status(200).json(theater)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Khong tim thay ra rap' })
    }
}
async function createTheater(req, res) {
    try {
        const { name, city, address, type } = req.body
        console.log(name, city, address, type)
        const newTheater = await Theater.create({ name, city, address, type })
        res.status(201).json({ theater: newTheater, message: 'Tạo ra rạp thành công' })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'error create theater' })
    }
}
async function updateTheater(req, res) {
    try {
        const { id } = req.params
        const { name, city, address, type } = req.body
        const existingTheater = await Theater.findByPk(id)
        if (!existingTheater) return res.status(404).json({ message: 'Rạp not found' })
        existingTheater.name = name
        existingTheater.city = city
        existingTheater.address = address
        existingTheater.type = type
        await existingTheater.save()
        res.status(200).json({ message: 'Cập nhật rạp thành công' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error update theater' })
    }
}

async function deleteTheater(req, res) {
    try {
        const { id } = req.params
        const existingTheater = await Theater.findByPk(id)
        if (!existingTheater) return res.status(404).json({ message: 'Rạp not found' })
        await existingTheater.destroy()
        res.status(200).json({ message: 'Xoá rạp thành công' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error delete theater' })
    }
}
module.exports = { getTheaters, getTheater, createTheater, updateTheater, deleteTheater }