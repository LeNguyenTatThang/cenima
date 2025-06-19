const express = require('express')
const { getFoods, createFood, updateFood, deleteFood, getFoodFromCombo } = require('../controllers/food.controller')
const router = express.Router()
const uploadFoodImages = require('../middleware/uploadFood')

router.get('/getFoods', getFoods)
router.post('/createFood', uploadFoodImages.single('foods'), createFood)
router.put('/updateFood/:id', uploadFoodImages.single('foods'), updateFood)
router.delete('/deleteFood/:id', deleteFood)
router.get('/getFoodFromCombo', getFoodFromCombo)
module.exports = router