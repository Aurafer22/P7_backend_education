const mongoose = require('mongoose')
const Course = require('../models/cursos')
const subjects = require('../../utils/data')

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
    return res.status(200).json(courses)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getOneCourse = async (req, res, next) => {
  try {
    const { id } = req.params
    const oneCourse = await Course.findById(id).populate('subjects')
    return res.status(200).json(oneCourse)
  } catch (error) {
    return res.status(400).json(`No se ha encontrado el curso: ${error}`)
  }
}

// Sólo podrá subir cursos el usuario que tenga rol: "Profesor"

const postCourse = async (req, res, next) => {
  try {
    const { course, tuthor } = req.body
    const dupliCourse = await Course.findOne({
      $and: [{ course }, { tuthor }]
    })
    if (dupliCourse) {
      return res.status(400).json('Este curso ya existe')
    }
    const newCourse = new Course({
      course: req.body.course,
      description: req.body.description,
      subjects: req.body.subjects,
      tuthor: req.body.tuthor
    })
    const savedCourse = await newCourse.save()
    return res.status(201).json(savedCourse)
  } catch (error) {
    return res.status(400).json(`Error al crear el curso: ${error}`)
  }
}

// Queremos que solo puedan modificar los cursos los usuarios con rol: "Profesor"
const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params
    const { subjects, tuthor } = req.body
    const courseById = await Course.findById(id)
    if (!courseById) {
      return res.status(400).json('Este curso no existe')
    }
    const updateData = {}
    if (subjects) {
      updateData.$addToSet = { subjects: { $each: subjects } }
    }
    if (tuthor) {
      updateData.tuthor = tuthor
    }
    const modifyCourse = await Course.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(modifyCourse)
  } catch (error) {
    return res.status(400).json(`Error al actualizar datos del curso: ${error}`)
  }
}

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedCourse = await Course.findByIdAndDelete(id)
    return res.status(200).json('Curso eliminado correctamente')
  } catch (error) {
    return res.status(400).json(`Error al eliminar el curso: ${error}`)
  }
}

module.exports = {
  getCourses,
  getOneCourse,
  postCourse,
  updateCourse,
  deleteCourse
}
