const { PIB } = require('../models/Pib')

const getPib = async () => {
  try {
    return await PIB.find().sort({ Ano: 1, Trimestre: 1 })
  } catch (error) {
    throw { error }
  }
}

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
  postPib
}
