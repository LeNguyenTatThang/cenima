const express = require('express')
const passport = require('../config/passport')
const router = express.Router()

/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags:
 *      - Login social
 *     summary: Login with Google
 *     description: Redirects user to Google OAuth login
 *     responses:
 *       302:
 *         description: Redirect to Google login
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags:
 *      - Login social
 *     summary: Google OAuth callback
 *     description: Handles Google authentication callback and returns user data with token
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code from Google
 *     responses:
 *       200:
 *         description: Returns user info and JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 */
router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    res.json({ user: req.user.user, token: req.user.token })
})

/**
 * @swagger
 * /auth/facebook:
 *   get:
 *     tags:
 *      - Login social
 *     summary: Login with Facebook
 *     description: Redirects user to Facebook OAuth login
 *     responses:
 *       302:
 *         description: Redirect to Facebook login
 */
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))

/**
 * @swagger
 * /auth/facebook/callback:
 *   get:
 *     tags:
 *      - Login social
 *     summary: Facebook OAuth callback
 *     description: Handles Facebook authentication callback and returns user data with token
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code from Facebook
 *     responses:
 *       200:
 *         description: Returns user info and JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 token:
 *                   type: string
 */
router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
    res.json({ user: req.user.user, token: req.user.token })
})

module.exports = router