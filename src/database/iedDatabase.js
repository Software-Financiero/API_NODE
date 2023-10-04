const { IED } = require('../models/IED')

const getIed = async () => {
  try {
    return await IED.find().sort({ Orden: 1 })
  } catch (error) {
    throw { error }
  }
}

const postIed = async (datosRecibidos) => {
  try {
    const datosConOrden = datosRecibidos.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await IED.create(datosConOrden)
    return Result
  } catch (error) {
    throw { error }
  }
}

module.exports = {
  getIed,
  postIed
}
