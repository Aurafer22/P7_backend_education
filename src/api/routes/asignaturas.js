const {
  isProfesor,
  isAlumn,
  isAuth
} = require('../../middlewares/auth.middlewares')
const {
  getSubjects,
  postSubject,
  getOneSubject,
  updateSubject,
  deleteSubject
} = require('../controllers/asignaturas')
const subjectsRoutes = require('express').Router()
// Solo los profesores pueden ver el listado completo de asignaturas
subjectsRoutes.get('/', [isAuth, isProfesor], getSubjects)
// Solo alumnos del curso seleccionado y profesores pueden ver una asignatura concreta
subjectsRoutes.get('/:id', [isAlumn], getOneSubject)
// Solo los profesores pueden: crear, modificar o eliminar una asignatura
subjectsRoutes.post('/', [isAuth, isProfesor], postSubject)
subjectsRoutes.put('/:id', [isAuth, isProfesor], updateSubject)
subjectsRoutes.delete('/:id', [isAuth, isProfesor], deleteSubject)

module.exports = subjectsRoutes
