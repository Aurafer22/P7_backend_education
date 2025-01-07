const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [8, 'Password de 8 caracteres mínimo']
    },
    courses: {
      type: mongoose.Types.ObjectId,
      ref: 'courses',
      required: true
    },
    rol: { type: String, enum: ['profesor', 'alumno'], default: 'alumno' }
  },
  {
    timestamps: true,
    collection: 'users'
  }
)

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
