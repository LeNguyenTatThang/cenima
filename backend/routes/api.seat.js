const express = require('express')
const { getSeats, createSeatForAuditorium, updateSeat, deleteSeat } = require('../controllers/seat.controller')

const router = express.Router()


router.get('/getSeats/:id', getSeats)
router.post('/createSeatForAuditorium', createSeatForAuditorium)
router.put('/updateSeat', updateSeat)
router.delete('/deleteSeat/:auditorium_id', deleteSeat)
module.exports = router