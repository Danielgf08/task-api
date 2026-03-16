const express = require('express')
const app = express()

app.use(express.json())

const authRoutes = require('./routes/auth.routes')
const taskRoutes = require('./routes/task.routes')

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

module.exports = app
