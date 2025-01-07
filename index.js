require('dotenv').config()
const express = require('express')
const { connectDB } = require('./src/config/db')
const coursesRoutes = require('./src/api/routes/cursos')
const subjectsRoutes = require('./src/api/routes/asignaturas')
const usersRoutes = require('./src/api/routes/users')
const app = express()

connectDB()
app.use(express.json())
app.use('/api/v1/courses', coursesRoutes)
app.use('/api/v1/subjects', subjectsRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})
app.listen(3000, () => {
  console.log('Servidor conectado: http://localhost:3000')
})
