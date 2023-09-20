const { PIB } = require("../models/Pib");

const getPib = async () => {
  try {
    return await PIB.find(); 
  } catch (error) {
    throw { error };
  }
};

const postPib = async (datosRecibidos) => {
  try {
    const Result = await PIB.create(datosRecibidos);
    return Result;
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getPib,
  postPib,
};
