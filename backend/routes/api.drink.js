const express = require('express')
const { getDrinks, createDrink } = require('../controllers/drink.controller')
const router = express.Router()
const uploadDrinkImages = require('../middleware/uploadDrink')
router.get('/getDrinks', getDrinks)
router.post('/createDrink', uploadDrinkImages.single('drinkImage'), createDrink)

module.exports = router