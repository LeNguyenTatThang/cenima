const express = require('express')
const { getSeats, createSeatForAuditorium, deleteSeat } = require('../controllers/seat.controller')

const router = express.Router()


router.get('/getSeats/:id', getSeats)
router.post('/createSeatForAuditorium', createSeatForAuditorium)
router.delete('/deleteSeat/:auditorium_id', deleteSeat)
module.exports = router