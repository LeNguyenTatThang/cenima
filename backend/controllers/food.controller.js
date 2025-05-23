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
        res.status(200).json(foods)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'error get food' })
    }
}
module.exports = {
    getFoods
}