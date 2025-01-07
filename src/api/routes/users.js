const { isProfesor } = require('../../middlewares/auth.middlewares')
const { registerUser, loginUser, getUsers } = require('../controllers/users')

const usersRoutes = require('express').Router()

usersRoutes.post('/register', registerUser)
usersRoutes.post('/login', loginUser)
usersRoutes.get('/', [isProfesor], getUsers)

module.exports = usersRoutes
