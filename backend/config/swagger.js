const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const express = require('express')
const router = express.Router()
const option = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Cenima api",
            version: '1.0.0',
            contact: {
                name: "Dez",
                email: "lenguyentatthang.dev@gmail.com",
                url: "https://github.com/lenguyentatthang"
            },
            version: "1.0.0"
        }
    },
    apis: ['./routes/*.js']
}
const swaggerSpec = swaggerJSDoc(option)

function swaggerDocs(app, port) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    app.get("docs.json", (req, res) => {
        res.setHeader('Content-Type', 'application')
        res.send(swaggerSpec)
    })
}
module.exports = swaggerDocs