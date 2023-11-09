const mongoose = require('mongoose')

const monedaSchema = new mongoose.Schema({
  unidad: {
    type: String,
    require: true
  },
  valor: {
    type: String,
    require: true
  },
  vigenciadesde: {
    type: String,
    require: true
  },
  vigenciahasta: {
    type: String,
    require: true
  }
})

const moneda = mongoose.model('Moneda', monedaSchema, 'Moneda')

module.exports = { moneda }
