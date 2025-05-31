const express = require('express')
const { getFoods, createFood, updateFood, deleteFood } = require('../controllers/food.controller')
const router = express.Router()
const uploadFoodImages = require('../middleware/uploadFood')

router.get('/getFoods', getFoods)
router.post('/createFood', uploadFoodImages.single('foods'), createFood)
router.put('/updateFood/:id', uploadFoodImages.single('foods'), updateFood)
router.delete('/deleteFood/:id', deleteFood)
module.exports = router