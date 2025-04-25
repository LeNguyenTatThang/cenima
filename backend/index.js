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
const apiBanner = require('./routes/api.banner')
const session = require("express-session")
const passport = require("passport")
const app = express()

app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ limit: "10mb", extended: true }))
const port = process.env.PORT
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(compression())
app.use(morgan('dev'))
app.use(cors({
    origin: ["http://localhost:3000", "http://172.20.0.5:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use('/api', apiBanner)
app.use('/auth', authRoutes)
app.use(bodyParser.json())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())

app.use('/uploads', cors({
    origin: ["http://localhost:3000", "http://172.20.0.5:3000"],
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"]
}), express.static('uploads'))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
})
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next();
});
app.use(limiter)
app.use(router)

app.listen(port, () => {
    console.log(`Sever đang chạy: http://localhost:${port}`)
    swaggerDocs(app, port)
})