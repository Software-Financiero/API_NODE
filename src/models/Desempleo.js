const mongoose = require("mongoose");

const DesempleoSchema = new mongoose.Schema({
  Ano:{
    type: String,
    require:true
  },
  Mes:{
    type: String,
    require:true
  },
  Tasa:{
    type: Number,
    require:true
  },
});


const Desempleo = mongoose.model("Desempleo", DesempleoSchema, "Desempleo");

module.exports = {Desempleo};

