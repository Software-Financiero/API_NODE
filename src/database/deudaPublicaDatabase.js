const {Deuda} = require("../models/DeudaPublica");

const getDeuda = async () => {
  try {
    return await Deuda.find(); 
  } catch (error) {
    throw { error };
  }
};

const postDeuda = async (datosRecibidos) => {
  try {
    const Result = await Deuda.create(datosRecibidos);
    return Result;
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getDeuda,
  postDeuda,
};
