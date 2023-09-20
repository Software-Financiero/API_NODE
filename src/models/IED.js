const mongoose = require("mongoose");

const IedSchema = new mongoose.Schema({
  Ano:{
    type: String,
    require:true
  },
  Trimestre:{
    type: Number,
    require:true
  },
  Total:{
    type: Number,
    require:true
  },
});


const IED = mongoose.model("IED", IedSchema, "IED");

module.exports = {IED};

