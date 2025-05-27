const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = "uploads/foods"
        console.log("Destination directory:", uploadDir)
        if (!fs.existsSync(uploadDir)) {
            console.log("Directory does not exist, creating:", uploadDir)
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        const fileName = `food-${Date.now()}${ext}`
        console.log("Generated filename:", fileName)
        cb(null, fileName)
    }
})
const uploadBanner = multer({ storage: storage })
module.exports = uploadBanner 