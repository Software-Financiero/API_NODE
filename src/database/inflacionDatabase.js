const {Inflacion} = require("../models/Inflacion");

const getInflacion = async () => {
  try {
    return await Inflacion.find(); 
  } catch (error) {
    throw { error };
  }
};

const postInflacion = async (datosRecibidos) => {
  try {
    const Result = await Inflacion.create(datosRecibidos);
    return Result;
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getInflacion,
  postInflacion,
};
