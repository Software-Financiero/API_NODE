const mongoose = require('mongoose')

const PibSchema = new mongoose.Schema({
  Ano: {
    type: String,
    require: true
  },
  Trimestre: {
    type: Number,
    require: true
  },
  PIB: {
    type: Number,
    require: true
  }
})

const PIB = mongoose.model('PIB', PibSchema, 'PIB')

module.exports = { PIB }
