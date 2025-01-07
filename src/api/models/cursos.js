const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cursoSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
      enum: ['1º ESO', '2º ESO', '3º ESO', '4º ESO', '1º BACH', '2º BACH']
    },
    description: { type: String, maxlength: 200 },
    subjects: [{ type: mongoose.Types.ObjectId, ref: 'subjects' }],
    tuthor: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'courses'
  }
)

const Course = mongoose.model('courses', cursoSchema, 'courses')
module.exports = Course
