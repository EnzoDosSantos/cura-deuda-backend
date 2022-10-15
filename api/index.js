require('./mongo.js')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const routes = require('./src/routes/cities.routes.js')
const helpRoute = require('./src/routes/help.routes.js')

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.use("/", helpRoute)

app.use("/cities", routes)

app.listen(4000, () => {
    console.log("Server running on port 4000")
})