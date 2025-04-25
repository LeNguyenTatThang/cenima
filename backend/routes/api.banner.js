const express = require('express')
const uploadBanner = require('../middleware/uploadBanner')
const router = express.Router()
const {
    createBanner,
    getBanners,
    updateBanner } = require('../controllers/banner.controller')

router.get('/getBanners', getBanners)
router.post('/createBanner', uploadBanner.single('image'), createBanner)
router.put('/updateBanner/:id', uploadBanner.single('image'), updateBanner)

module.exports = router