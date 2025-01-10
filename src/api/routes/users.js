const {
  isProfesor,
  isAuth,
  isAlumn
} = require('../../middlewares/auth.middlewares')
const {
  registerUser,
  loginUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
  upRolYCourse
} = require('../controllers/users')

const usersRoutes = require('express').Router()

usersRoutes.post('/register', registerUser)
usersRoutes.post('/login', loginUser)
usersRoutes.put('/:id', [isProfesor], upRolYCourse)
usersRoutes.get('/', [isProfesor], getUsers)
usersRoutes.get('/:id', [isAlumn], getOneUser)
usersRoutes.put('/:id', [isAlumn], updateUser)
usersRoutes.delete('/:id', [isAlumn], deleteUser)

module.exports = usersRoutes
