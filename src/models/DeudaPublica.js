const mongoose = require("mongoose");

const DeudaSchema = new mongoose.Schema({
  Ano:{
    type: String,
    require:true
  },
  Mes:{
    type: String,
    require:true
  },
  Dia:{
    type: String,
    require:true
  },
  total:{
    type: Number,
    require:true
  },
});


const Deuda = mongoose.model("Deuda", DeudaSchema, "Deuda");

module.exports = {Deuda};