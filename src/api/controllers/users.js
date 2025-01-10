const { default: mongoose } = require('mongoose')
const { generateToken } = require('../../utils/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')

async function registerUser(req, res, next) {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      courses: req.body.courses
    })
    const userCreated = await User.findOne({ email: user.email })
    if (userCreated) {
      return res.status(400).json('Este usuario ya existe')
    }
    const userNew = await user.save()
    return res.status(201).json(`Usuario registrado con éxito: ${userNew}`)
  } catch (error) {
    return res.status(400).json(`Error al crear el usuario: ${error}`)
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      'courses'
    )
    if (!user) {
      return res.status(400).json('Usuario o contraseña incorrectos')
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id)
      return res.status(200).json({ user, token })
    } else {
      res.status(400).json('Usuario o contraseña incorrectos')
    }
  } catch (error) {
    return res.status(400).json(`Error en el login: ${error}`)
  }
}

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate('courses')
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(`Error para ver todos los usuarios: ${error}`)
  }
}
const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).json('Usuario inexistente')
    }
    const user = await User.findById(id)
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(`NO se ha encontrado el usuario: ${error}`)
  }
}
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(400).json('Usuario inexistente')
    }
    const { name, password } = req.body
    const updateData = {}
    if (name) {
      updateData.name = name
    }
    if (password) {
      updateData.password = bcrypt.hashSync(req.body.password, 10)
    }
    const modifyUser = await User.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(modifyUser)
  } catch (error) {
    return res
      .status(400)
      .json(`Error al actualizar los datos de usuario: ${error}`)
  }
}

const upRolYCourse = async (req, res, next) => {
  console.log('Controlador upRolYCourse iniciado')
  console.log('Cuerpo de la solicitud:', req.body)
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(400).json('Usuario inexistente')
    }
    const { rol, courses } = req.body
    const updateData = {}
    if (rol && ['profesor', 'alumno'].includes(rol)) {
      updateData.rol = rol
    }
    if (courses) {
      updateData.courses = courses
    }
    console.log(updateData)

    const modifyRol = await User.findByIdAndUpdate(id, updateData, {
      new: true
    })
    return res.status(200).json(modifyRol)
  } catch (error) {
    return res.status(400).json(`Error al actualizar el Rol: ${error}`)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    return res.status(200).json('Usuario eliminado correctamente')
  } catch (error) {
    return res.status(400).json(`Error al eliminar usuario: ${error}`)
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getOneUser,
  updateUser,
  upRolYCourse,
  deleteUser
}
