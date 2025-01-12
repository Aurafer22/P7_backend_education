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
// Solo los profesores pueden cambiar el rol y curso de un usuario y ver el listado completo de usuarios
// usersRoutes.put('/:id', [isAlumn], updateUser) --> crea conflicto.. revisar soluciones
usersRoutes.put('/:id', [isAuth, isProfesor], upRolYCourse)
usersRoutes.get('/', [isAuth, isProfesor], getUsers)
// Los profesores y cada alumno puede ver, modificar y eliminar su perfil
usersRoutes.get('/:id', [isAlumn], getOneUser)
usersRoutes.delete('/:id', [isAlumn], deleteUser)

module.exports = usersRoutes
