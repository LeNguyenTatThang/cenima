const express = require('express')
const { getFoods, createFood } = require('../controllers/food.controller')
const router = express.Router()
const uploadFoodImages = require('../middleware/uploadFood')

router.get('/getFoods', getFoods)
router.post('/createFood', uploadFoodImages.array('foods', 10), createFood)

module.exports = router