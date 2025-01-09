const Subject = require('../models/asignaturas')

const getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find()
    return res.status(200).json(subjects)
  } catch (error) {
    return res.status(400).json(`Asignaturas no encontradas: ${error}`)
  }
}

// const getSubjects = async (req, res, next) => {
//   try {
//     const subjects = await Subject.find()
//     return res.status(200).json(subjects)
//   } catch (error) {
//     return res.status(400).json(`Asignaturas no encontradas: ${error}`)
//   }
// }

const getOneSubject = async (req, res, next) => {
  try {
    const { id } = req.params
    const oneSubject = await Subject.findById(id)
    return res.status(200).json(oneSubject)
  } catch (error) {
    return res.status(400).json(`No se encuentra asignatura: ${error}`)
  }
}

const postSubject = async (req, res, next) => {
  try {
    const { name } = req.params
    const dupliSubject = await Subject.findOne({ name })
    if (dupliSubject) {
      return res.status(400).json('Esta asignatura ya existe')
    }
    const newSubject = new Subject({
      name: req.body.name,
      courses: req.body.courses,
      teacher: req.body.teacher,
      level: req.body.level,
      documents: req.body.documents
    })
    const savedSubject = newSubject.save()
    return res.status(201).json(newSubject)
  } catch (error) {
    return res.status(400).json(`Error al crear la asignatuta: ${error}`)
  }
}

const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params
    const { course, teacher, documents } = req.body
    const subject = await Subject.findById(id)
    if (!subject) {
      return res.status(400).json('Esta asignatura NO EXISTE')
    }
    const updateData = {}
    if (course) {
      updateData.course = course
    }
    if (teacher) {
      updateData.teacher = teacher
    }
    if (documents) {
      updateData.$addToSet = { documents: { $each: documents } }
    }
    const modifySubject = await Subject.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(modifySubject)
  } catch (error) {
    return res.status(400).json(`Error al modificar la asignatura: ${error}`)
  }
}

const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedSubject = await Subject.findByIdAndDelete(id)
    return res
      .status(200)
      .json(`Asignatura eliminada correctamente: ${deletedSubject}`)
  } catch (error) {
    return res
      .status(400)
      .json(`Error al intentar eliminar la asignatura: ${error}`)
  }
}

module.exports = {
  getSubjects,
  getOneSubject,
  postSubject,
  updateSubject,
  deleteSubject
}
