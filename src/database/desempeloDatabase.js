const {Desempleo} = require("../models/Desempleo");

const getDesempleo = async () => {
  try {
    return await Desempleo.find().sort({ Orden: 1 });  
  } catch (error) {
    throw { error };
  }
};

const postDesempleo = async (datosRecibidos) => {
  try {
    const datosConOrden = datosRecibidos.map((dato, index) => ({
      ...dato,
      Orden: index + 1, 
    }));
    const Result = await Desempleo.create(datosConOrden);
    return Result; 
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getDesempleo,
  postDesempleo,
};
