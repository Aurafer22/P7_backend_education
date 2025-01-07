const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema(
  {
    name: { type: String, required: true },
    teacher: { type: String, required: true },
    level: { type: Number, enum: [1, 2, 3] },
    documents: { type: [String], required: true }
  },
  {
    timestamps: true,
    collection: 'subjects'
  }
)

const Subject = mongoose.model('subjects', subjectSchema, 'subjects')
module.exports = Subject
