const json = require('body-parser')
const { Drink } = require('../models')
const { where } = require('sequelize')
const baseUrl = 'http://localhost:5000'
const getDrinks = async (req, res) => {
    try {
        const drinks = await Drink.findAll()
        const dataDrink = drinks.map(drink => ({
            ...drink.toJSON(),
            image: baseUrl + drink.image
        }))
        res.status(200).json(dataDrink)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error get drinks' })
    }
}

const createDrink = async (req, res) => {

    try {
        const { name, price } = req.body
        const image = req.file ? `/uploads/drinks/${req.file.filename}` : null

        if (!name || !price || !image) {
            return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' })
        }

        const newDrink = await Drink.create({ name, price, image })
        const drink = { ...newDrink.get(), image: baseUrl + image }
        return res.status(200).json({
            message: 'Tạo đồ uống thành công',
            data: drink
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error create drink' })
    }
}

const updateDrink = async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, status } = req.body
        const image = req.file ? `/uploads/drinks/${req.file.filename}` : null
        const existingDrink = await Drink.findByPk(id)
        if (!existingDrink) return res.status(404).json({ message: 'Drink not found' })
        existingDrink.name = name
        existingDrink.price = price
        existingDrink.status = status
        existingDrink.image = image
        await existingDrink.save()
        return res.status(200).json({
            message: 'Cập nhật đồ uống thành công',
            data: existingDrink
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'error update drink' })
    }
}

const deleteDrink = async (req, res) => {
    try {
        const { id } = req.params
        const existingDrink = await Drink.findByPk(id)
        if (!existingDrink) return res.status(404).json({ message: 'Drink not found' })
        await existingDrink.destroy()

        return res.status(200).json({ message: 'Xoá đồ uống thành công' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'error delete drink' })
    }
}
module.exports = {
    getDrinks,
    createDrink,
    updateDrink,
    deleteDrink
}