const mongoose = require('mongoose')
const User = require('../api/models/users')
const { verifyToken } = require('../utils/jwt')

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) {
    return res.status(401).json('No hay token')
  }
  try {
    const { id } = verifyToken(token, process.env.JWT_SECRET)
    if (!id) {
      return res.status(401).json('Token inválido')
    }
    const user = await User.findById(id)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json(`Acceso NO AUTORIZADO: ${error}`)
  }
}

const isProfesor = async (req, res, next) => {
  const user = req.user
  if (!user) {
    return res.status(401).json('Usuario sin autenticar')
  }
  try {
    if (user.rol === 'profesor') {
      req.user = user
      next()
    } else {
      return res
        .status(403)
        .json('Solo un profesor tiene autorización para realizar esta acción')
    }
  } catch (error) {
    return res.status(500).json(`Error en la autenticación: ${error}`)
  }
}
// const isAlumn = async (req, res, next) => {
//   const user = req.user
//   if (!user) {
//     return res.status(401).json('Usuario sin autenticar')
//   }
//   const paramId = req.params.id
//   const idCourseUser = user.courses._id
//   // const idUserToString = idCourseUser.toString()
//   // const subjectId = user.courses?.subjects?.map((subject) => subject.toString())
//   const userId = user._id
//   // const userIdString = userId.toString()
//   console.log('paramiD: ' + paramId)
//   console.log('idCourseUser: ' + idCourseUser)
//   // console.log('idUserToString: ' + idUserToString)
//   // console.log('subjectId: ' + subjectId)
//   console.log('userId: ' + userId)
//   // console.log('userIdString: ' + userIdString)

//   try {
//     if (
//       idCourseUser === paramId ||
//       user.rol === 'profesor' ||
//       paramId === userId
//     ) {
//       console.log(user.rol === 'profesor')
//       console.log(paramId === userId)
//       rq.user = user
//       next()
//     } else {
//       return res.status(403).json('Acceso NO AUTORIZADO')
//     }
//   } catch (error) {
//     return res.status(500).json(`Error en la autenticación: ${error}`)
//   }
// }
// const isAuth = async (req, res, next) => {
//   const token = req.headers.authorization?.replace('Bearer ', '')
//   if (!token) {
//     return res.status(401).json('No hay token')
//   }
//   try {
//     const { id } = verifyToken(token, process.env.JWT_SECRET)
//     req.user = await User.findById(id)
//     next()
//   } catch (error) {
//     return res.status(401).json('Acceso NO AUTORIZADO')
//   }
// }

// const isProfesor = async (req, res, next) => {
//   const token = req.headers.authorization?.replace('Bearer ', '')
//   const { id } = verifyToken(token, process.env.JWT_SECRET)
//   const user = await User.findById(id)
//   if (!token) {
//     return res.status(401).json('No hay token')
//   }
//   try {
//     if (user.rol === 'profesor') {
//       req.user = user
//       next()
//     } else {
//       return res
//         .status(400)
//         .json('Solo un profesor tiene autorización para realizar esta acción')
//     }
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// }
const isAlumn = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    return res.status(401).json('No hay token')
  }
  const { id } = verifyToken(token, process.env.JWT_SECRET)
  if (!id) {
    return res.status(401).json('Token inválido')
  }
  const user = await User.findById(id).populate('courses')
  const paramId = req.params.id
  const idCourseUser = user.courses._id
  const idUserToString = idCourseUser.toString()
  const subjectId = user.courses.subjects.toString()
  const userId = user._id

  const userIdString = userId.toString()
  try {
    if (
      idUserToString === paramId ||
      user.rol === 'profesor' ||
      subjectId.includes(paramId) ||
      paramId === userIdString
    ) {
      req.user = user
      next()
    } else {
      return res.status(403).json('Acceso NO AUTORIZADO')
    }
  } catch (error) {
    return res.status(500).json(`Error en la autenticación: ${error}`)
  }
}

module.exports = { isAuth, isProfesor, isAlumn }
