const express = require('express')
const { getTheaters, createTheater, updateTheater, deleteTheater } = require('../controllers/theaters.controller')
const router = express.Router()

router.get('/getTheaters', getTheaters)
router.post('/createTheater', createTheater)
router.put('/updateTheater/:id', updateTheater)
router.delete('/deleteTheater/:id', deleteTheater)

module.exports = router