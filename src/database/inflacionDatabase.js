const { Inflacion } = require("../models/Inflacion");

const meses = {
  Ene: 1,
  Feb: 2,
  Mar: 3,
  Abr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Ago: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dic: 12,
};

const getInflacionGrafica = async () => {
  try {
    const inflacionData = await Inflacion.aggregate([
      {
        $addFields: {
          MesNumerico: {
            $arrayElemAt: [
              Object.values(meses),
              {
                $indexOfArray: [Object.keys(meses), "$Mes"],
              },
            ],
          },
        },
      },
      {
        $sort: { Ano: 1, MesNumerico: 1, Orden: 1 },
      },
    ]);

    return inflacionData.filter((item) => item.Ano > 2019);
  } catch (error) {
    throw { error };
  }
};

const getInflacion = async () => {
  try {
    const inflacionData = await Inflacion.aggregate([
      {
        $addFields: {
          MesNumerico: {
            $arrayElemAt: [
              Object.values(meses),
              {
                $indexOfArray: [Object.keys(meses), "$Mes"],
              },
            ],
          },
        },
      },
      {
        $sort: { Ano: 1, MesNumerico: 1, Orden: 1 },
      },
    ]);

    return inflacionData;
  } catch (error) {
    throw { error };
  }
};

const postInflacion = async (datosRecibidos) => {
  try {
    const datosConOrden = datosRecibidos.map((dato, index) => ({
      ...dato,
      Orden: index + 1,
    }));

    const Result = await Inflacion.create(datosConOrden);
    return Result;
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getInflacion,
  postInflacion,
  getInflacionGrafica
};
