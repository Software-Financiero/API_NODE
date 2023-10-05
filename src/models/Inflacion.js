const mongoose = require('mongoose')

const InflacionSchema = new mongoose.Schema({
  Ano: {
    type: String,
    require: true
  },
  Mes: {
    type: String,
    require: true
  },
  Porcentaje: {
    type: Number,
    require: true
  }
})

const Inflacion = mongoose.model('Inflacion', InflacionSchema, 'Inflacion')

module.exports = { Inflacion }
