const { Deuda } = require("../models/DeudaPublica");

const meses = {
  "Ene": 1,
  "Feb": 2,
  "Mar": 3,
  "Abr": 4,
  "May": 5,
  "Jun": 6,
  "Jul": 7,
  "Ago": 8,
  "Sep": 9,
  "Oct": 10,
  "Nov": 11,
  "Dic": 12
}

const getDeuda = async () => {
  try {
    return await Deuda.aggregate([
      {
        $addFields: {
          MesNumerico: {
            $arrayElemAt: [Object.values(meses), {
              $indexOfArray: [Object.keys(meses), "$Mes"]
            }]
          }
        }
      },
      {
        $sort: { Ano: 1, MesNumerico: 1, Orden: 1 }
      }
    ]);
  } catch (error) {
    throw { error }
  }
}

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
