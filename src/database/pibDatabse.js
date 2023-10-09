const { PIB } = require('../models/Pib')

const getPibGrafica = async () => {
  try {
    const pibData = await PIB.find().sort({ Ano: 1, Trimestre: 1 });
    const pibDataFiltrada = pibData.filter(item => item.Ano > 2019);
    return pibDataFiltrada;
  } catch (error) {
    throw { error };
  }
};


const getPib = async () => {
  try {
    const pibData = await PIB.find().sort({ Ano: 1, Trimestre: 1 });
    return pibData;
  } catch (error) {
    throw { error };
  }
};


const postPib = async (datosRecibidos) => {
  try {
    const datosConOrden = datosRecibidos.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await PIB.create(datosConOrden)
    return Result
  } catch (error) {
    throw { error }
  }
}

module.exports = {
  getPib,
  postPib,
  getPibGrafica
}
