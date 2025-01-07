const { isProfesor } = require('../../middlewares/auth.middlewares')
const {
  getSubjects,
  postSubject,
  getOneSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/asignaturas')
const subjectsRoutes = require('express').Router()
// Solo los alumnos del curso pueden ver las asignaturas
subjectsRoutes.get('/', getSubjects)
subjectsRoutes.get('/:id', getOneSubject)
// Solo los profesores pueden: crear, modificar o eliminar una asignatura
subjectsRoutes.post('/', [isProfesor], postSubject)
subjectsRoutes.put('/:id', [isProfesor], updateSubject)
subjectsRoutes.delete('/:id', [isProfesor], deleteSubject)

module.exports = subjectsRoutes
