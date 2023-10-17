const InflacionDatabase = require('../../database/inflacionDatabase')
const axios = require('axios')
const { Inflacion } = require('../../models/Inflacion')

const PostInflacionforTrimester = async (req, res) => {
  try {
    const fileData = req.file.buffer

    const response = await axios.post('https://api-python.fly.dev/indicadores/inflacion', fileData, {
      headers: {
        'Content-Type': 'application/octet-stream' // Asegura que los datos se envíen como un archivo binario
      }
    })

    const datosConOrden = response.data.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await Inflacion.create(datosConOrden)

    res.status(200).send(Result)
  } catch (error) {
    res.send(error)
  }
}

const GetInflacionforYears = async (req, res) => {
  try {
    const data = await Inflacion.find({ Ano: { $gte: 2020 } }).sort({ Ano: 1, Trimestre: 1 })

    const inflacionPorAño = data.reduce((resultado, objeto) => {
      const ano = objeto.Ano
      const porcentaje = objeto.Porcentaje

      if (resultado[ano]) {
        resultado[ano] += porcentaje
      } else {
        resultado[ano] = porcentaje
      }
      return resultado
    }, {})

    // Convierte el objeto en un arreglo de objetos
    const inflacionAnualArray = Object.entries(inflacionPorAño).map(([ano, porcentaje]) => ({
      Ano: ano,
      Porcentaje_Anual: porcentaje
    }))

    // Imprime el resultado
    res.status(200).send(inflacionAnualArray)
  } catch (error) {
    res.send(error)
  }
}

const getInflacion = async (req, res) => {
  try {
    const Inflacion = await InflacionDatabase.getInflacion()
    res.status(201).send({ status: 'OK', data: Inflacion })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getInflacionGrafica = async (req, res) => {
  try {
    const Inflacion = await InflacionDatabase.getInflacionGrafica()
    res.status(201).send({ status: 'OK', data: Inflacion })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const prediccionesInflacion = async (req, res) => {
  try {
    const response = await axios.get('https://api-python.fly.dev/indicadores/inflacion/prediccion')
    const data = response.data // Obtener solo los datos de la respuesta
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
}

const postInflacion = async (req, res) => {
  try {
    const datosRecibidos = req.body
    const Inflacion = await InflacionDatabase.postInflacion(datosRecibidos)
    res.status(201).send({ status: 'OK', data: Inflacion })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getInflacion,
  postInflacion,
  getInflacionGrafica,
  GetInflacionforYears,
  PostInflacionforTrimester,
  prediccionesInflacion
}
