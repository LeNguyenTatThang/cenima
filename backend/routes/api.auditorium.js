const express = require('express')
const { getAuditoriums, getAuditorium, updateAuditorium, createAuditorium, deleteAuditorium } = require('../controllers/auditorium.controller')
const router = express.Router()

router.get('/getAuditoriums', getAuditoriums)
router.get('/getAuditorium/:id', getAuditorium)
router.post('/createAuditorium', createAuditorium)
router.put('/updateAuditorium/:id', updateAuditorium)
router.delete('/deleteAuditorium/:id', deleteAuditorium)

module.exports = router