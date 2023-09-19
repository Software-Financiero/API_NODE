const mongoose = require("mongoose");

const PibSchema = new mongoose.Schema({
  periodo: {
    type: Number,
    required: true
  },
  milesDeMillonesDePesos: {
    type: Number, 
    required: true 
  }
});


const PIB = mongoose.model("PIB", PibSchema, "PIB");

module.exports = { PIB };


