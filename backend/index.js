const express = require('express');
const router = require("./routes/index.js")
const swaggerDocs = require("./config/swagger.js")
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const session = require("express-session")
const passport = require("passport")
const app = express()

const port = process.env.PORT
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))
app.use('/auth', authRoutes)
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
})

app.use(limiter)
app.use(router)

app.listen(port, () => {
    console.log(`Sever đang chạy: http://localhost:${port}`)
    swaggerDocs(app, port)
})