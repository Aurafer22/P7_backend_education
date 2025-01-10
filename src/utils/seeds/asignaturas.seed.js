const Subject = require('../../api/models/asignaturas')
const subjects = require('../data')
const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://aurafercomunicacion:7xu1AocKSXXYNwbs@cluster0.sahoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(async () => {
    const allSubjects = await Subject.find()
    if (allSubjects.length) {
      await Subject.collection.drop()
    }
  })
  .catch((error) =>
    console.log(`Error al eliminar la colección desde semilla: ${error}`)
  )
  .then(async () => {
    await Subject.insertMany(subjects)
  })
  .catch((error) =>
    console.log(`Error al crear la colección desde semilla: ${error}`)
  )
  .finally(() => mongoose.disconnect())
