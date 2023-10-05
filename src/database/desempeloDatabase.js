const {Desempleo} = require("../models/Desempleo");

const getDesempleo = async () => {
  try {
    return await Desempleo.find();  
  } catch (error) {
    throw { error };
  }
};

const postDesempleo = async (datosRecibidos) => {
  try {
    const Result = await Desempleo.create(datosRecibidos);
    return Result; 
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getDesempleo,
  postDesempleo,
};
