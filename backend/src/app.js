require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const courseRoutes = require('./routes/courseRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const favouriteRoutes = require('./routes/favouriteRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/favourites', favouriteRoutes)

app.get('/', (req, res) => {
res.send('API Running')
})

module.exports = app
