const express = require('express')
const { getFoods } = require('../controllers/food.controller')

const router = express.Router()


router.get('/getFoods', getFoods)
module.exports = router