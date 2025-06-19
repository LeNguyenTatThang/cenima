const express = require('express')

const router = express.Router()
const uploadComboImages = require('../middleware/uploadCombo')
const { getAllCombos, createCombo, updateCombo, deleteCombo } = require('../controllers/combo.controller')
router.get('/getCombos', getAllCombos)
router.post('/createCombo', uploadComboImages.single('comboImage'), createCombo)
router.put('/updateCombo/:id', uploadComboImages.single('comboImage'), updateCombo)
router.delete('/deleteCombo/:id', deleteCombo)
module.exports = router