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
    return res.status(201).json('Usuario registrado con éxito')
  } catch (error) {
    return res.status(400).json(`Error al crear el usuario: ${error}`)
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })
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

module.exports = { registerUser, loginUser, getUsers }
