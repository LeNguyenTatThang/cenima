const json = require('body-parser')
const { Food, FoodSize } = require('../models')
const { where } = require('sequelize')

async function getFoods(req, res) {
    try {
        const foods = await Food.findAll({
            include: [{
                model: FoodSize,
                as: 'sizes',
                attributes: ['size', 'price', 'status']
            }],
            order: [['id', 'ASC']]
        })
        const baseUrl = 'http://localhost:5000/uploads/foods/'
        const foodsWithFullImageUrl = foods.map(food => {
            return {
                ...food.toJSON(),
                image: baseUrl + food.image
            }
        })

        res.status(200).json(foodsWithFullImageUrl)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error get food' })
    }
}

async function createFood(req, res) {
    let { name, sizes } = req.body
    const files = req.files
    if (!files || files.length === 0) {
        return res.status(400).json({ message: 'Không có ảnh được upload' })
    }

    try {
        if (typeof sizes === "string") {
            sizes = JSON.parse(sizes)
        }

        if (!name || !Array.isArray(sizes) || sizes.length === 0) return res.status(400).json({ message: 'Tên món ăn và danh sách size là bắt buộc.' })

        const image = files[0].filename
        const newFood = await Food.create({
            name,
            image,
            sizes: sizes.map(s => ({
                size: s.size,
                price: s.price,
                status: s.status ?? true
            }))
        }, {
            include: [{ model: FoodSize, as: 'sizes' }]
        })

        res.status(201).json(newFood)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error create food' })
    }
}

module.exports = {
    getFoods,
    createFood
}