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
    const datosConOrden = datosRecibidos.map((dato, index) => ({
      ...dato,
      Orden: index + 1, 
    }));

    const Result = await Deuda.create(datosConOrden);
    return Result;

  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getDeuda,
  postDeuda,
};
