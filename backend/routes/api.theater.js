const express = require('express')
const { getTheaters, createTheater, updateTheater, deleteTheater, getTheater } = require('../controllers/theaters.controller')
const router = express.Router()

router.get('/getTheaters', getTheaters)
router.get('/getTheater/:id', getTheater)
router.post('/createTheater', createTheater)
router.put('/updateTheater/:id', updateTheater)
router.delete('/deleteTheater/:id', deleteTheater)

module.exports = router