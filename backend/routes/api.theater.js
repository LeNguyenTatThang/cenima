const express = require('express')
const { getTheaters, createTheater, updateTheater, deleteTheater } = require('../controllers/theaters.controller')
const router = express.Router()

router.get('/getTheaters', getTheaters)
router.post('/createTheater', createTheater)
router.put('/updateBanner/:id', updateTheater)
router.delete('/deleteBanner/:id', deleteTheater)

module.exports = router