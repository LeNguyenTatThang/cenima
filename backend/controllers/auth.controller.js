const { User } = require('../models')
const jwt = require('jsonwebtoken')

exports.socialLogin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(400).json({ message: 'Đăng nhập thất bại!' })
        }

        const { user, token } = req.user

        res.status(200).json({
            message: 'Đăng nhập thành công!',
            user,
            token
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Lỗi đăng nhập!' })
    }
}
