const {
  isAuth,
  isProfesor,
  isAlumn
} = require('../../middlewares/auth.middlewares')
const {
  getCourses,
  getOneCourse,
  postCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/cursos')

const coursesRoutes = require('express').Router()
// todos los registrados pueden ver todos los cursos que hay
coursesRoutes.get('/', [isAuth], getCourses)
// Solo los alumnos del curso pueden ver este curso con sus asignaturas
coursesRoutes.get('/:id', [isAlumn], getOneCourse)
// Solo los profesores pueden: crear, modificar o eliminar un curso
coursesRoutes.post('/', [isProfesor], postCourse)
coursesRoutes.put('/:id', [isProfesor], updateCourse)
coursesRoutes.delete('/:id', [isProfesor], deleteCourse)

module.exports = coursesRoutes
