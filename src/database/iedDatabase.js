const {IED} = require("../models/IED");

const getIed = async () => {
  try {
    return await IED.find(); 
  } catch (error) {
    throw { error };
  }
};

const postIed = async (datosRecibidos) => {
  try {
    const Result = await IED.create(datosRecibidos);
    return Result;
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getIed,
  postIed,
};
