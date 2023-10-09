const { IED } = require("../models/IED");

const getIed = async () => {
  try {
    const iedData = await IED.find().sort({ Ano: 1, Trimestre: 1, Orden: 1 });
    return iedData;
  } catch (error) {
    throw { error };
  }
};

const getIedGrafica = async () => {
  try {
    const iedData = await IED.find().sort({ Ano: 1, Trimestre: 1, Orden: 1 });
    const iedDataFiltrada = iedData.filter((item) => item.Ano > 2019);
    return iedDataFiltrada;
  } catch (error) {
    throw { error };
  }
};

const postIed = async (datosRecibidos) => {
  try {
    const datosConOrden = datosRecibidos.map((dato, index) => ({
      ...dato,
      Orden: index + 1,
    }));

    const Result = await IED.create(datosConOrden);
    return Result;
  } catch (error) {
    throw { error };
  }
};

module.exports = {
  getIed,
  postIed,
  getIedGrafica,
};
