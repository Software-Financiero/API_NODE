const { Desempleo } = require("../models/Desempleo");

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

const getDesempleo = async () => {
  try {
    return await Desempleo.aggregate([
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
  } catch (error) {
    throw { error };
  }
};

const getDesempleoGrafica = async () => {
  try {
    const desempleodata = await Desempleo.aggregate([
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

    return desempleodata.filter((item) => item.Ano > 2019);
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
    return (Result = await Desempleo.create(datosConOrden));
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getDesempleo,
  postDesempleo,
  getDesempleoGrafica,
};
