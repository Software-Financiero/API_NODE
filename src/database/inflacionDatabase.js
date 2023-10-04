const { Inflacion } = require('../models/Inflacion')

const getInflacion = async () => {
  try {
    return await Inflacion.find().sort({ Orden: 1 })
  } catch (error) {
    throw { error }
  }
}

const postInflacion = async (datosRecibidos) => {
  try {
    const datosConOrden = datosRecibidos.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await Inflacion.create(datosConOrden)
    return Result
  } catch (error) {
    throw { error }
  }
}

module.exports = {
  getInflacion,
  postInflacion
}
