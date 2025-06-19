const express = require('express')
const { getDrinks, createDrink, updateDrink, deleteDrink } = require('../controllers/drink.controller')
const router = express.Router()
const uploadDrinkImages = require('../middleware/uploadDrink')
router.get('/getDrinks', getDrinks)
router.post('/createDrink', uploadDrinkImages.single('drinkImage'), createDrink)
router.put('/updateDrink/:id', uploadDrinkImages.single('drinkImage'), updateDrink)
router.delete('/deleteDrink/:id', deleteDrink)
module.exports = router