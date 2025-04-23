const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FaceBookStrategy = require('passport-facebook').Strategy
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({
            where: { email: profile.emailss[0].value }
        })

        if (!user) {
            user = await User.crete({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: bcrypt.hashSync("hometruyen_password", 10),
                procider: 'google',
                avatar: profile.photos[0].value
            })
        }

        const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return done(null, { user, token })
    } catch (err) {
        console.log(err)
        return done(err, null)
    }
}
))

passport.use(new FaceBookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ["id", "displayName", "photos", "email"]
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({
            where: { email: profile.emailss[0].value }
        })

        if (!user) {
            user = await User.crete({
                username: profile.displayName,
                email: profile.emails[0].value,
                password: bcrypt.hashSync("hometruyen_password", 10),
                procider: 'facebook',
                avatar: profile.photos[0].value
            })
        }

        const token = jwt.sign({ id: user.id, }, process.env.JWT_SECRET, { expiresIn: '7d' })
        return done(null, { user, token })
    } catch (err) {
        console.log(err)
        return done(err, null)
    }
}
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    cone(null, user)
})

module.exports = passport