const express = require('express')
const { createAccount, getAccounts, updateAccount, deleteAccount } = require('../controllers/accounts.controller')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/profiles"
        console.log(`Destination directory: ${uploadDir}`)
        if (!fs.existsSync(uploadDir)) {
            console.log(`Directory does not exist, creating: ${uploadDir}`)
            fs.mkdirSync(uploadDir, { recursive: true })
        }
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const filename = `profile-${Date.now()}${ext}`
        console.log(`Generated filename: ${filename}`)
        cb(null, filename)
    }
})

const upload = multer({ storage })
/**
 * @swagger
 * /api/getAccounts:
 *   get:
 *     tags:
 *       - Accounts
 *     summary: Get all account
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: johndoe
 *                   email:
 *                     type: string
 *                     example: johndoe@example.com
 *                   password:
 *                     type: string
 *                     example: 123456
 *                   points:
 *                     type: integer
 *                     example: 0
 *                   role:
 *                     type: string
 *                     example: admin
 *                   status:
 *                     type: string
 *                     example: active
 *       400:
 *         description: Bad request
 */

router.get('/api/getAccounts', getAccounts)

/**
 * @swagger
 * /api/createAccount:
 *   post:
 *     tags:
 *       - Accounts
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       409:
 *         description: Email đã tồn tại
 *       500:
 *         description: Lỗi server
 */
router.post('/api/createAccount', createAccount)

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.put('/api/updateAccount/:id', upload.single("profile_picture"), updateAccount)

router.delete('/api/deleteAccount/:id', deleteAccount)
module.exports = router
