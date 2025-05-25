const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/foods'
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const fileName = `food-${Date.now()}${ext}`
        cb(null, fileName)
    }
})

const uploadFoodImages = multer({ storage })

module.exports = uploadFoodImages
