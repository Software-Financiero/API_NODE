const DesempleoDatabase = require('../../database/desempeloDatabase')
const { Desempleo } = require('../../models/Desempleo')
const axios = require('axios')

const PostDesempleoforTrimester = async (req, res) => {
  try {
    const fileData = req.file.buffer

    const response = await axios.post('https://api-python.fly.dev/indicadores/desempleo', fileData, {
      headers: {
        'Content-Type': 'application/octet-stream' // Asegura que los datos se envíen como un archivo binario
      }
    })

    const datosConOrden = response.data.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await Desempleo.create(datosConOrden)

    res.status(200).send(Result)
  } catch (error) {
    res.send(error)
  }
}

const getDesempleoforYears = async (req, res) => {
  try {
    const data = await Desempleo.find({ Ano: { $gte: 2020 } }).sort({ Ano: 1, Trimestre: 1 })

    const desempleoPorAño = data.reduce((resultado, objeto) => {
      const ano = objeto.Ano
      const tasa = objeto.Tasa

      if (resultado[ano]) {
        resultado[ano] += tasa
      } else {
        resultado[ano] = tasa
      }
      return resultado
    }, {})

    // Convierte el objeto en un arreglo de objetos
    const desempleoAnualArray = Object.entries(desempleoPorAño).map(([ano, tasa]) => ({
      Ano: ano,
      Tasa: tasa
    }))

    // Imprime el resultado
    res.status(200).send(desempleoAnualArray)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getDesempleo = async (req, res) => {
  try {
    const Desempleo = await DesempleoDatabase.getDesempleo()
    res.status(201).send({ status: 'OK', data: Desempleo })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getDesempleoGrafica = async (req, res) => {
  try {
    const Desempleo = await DesempleoDatabase.getDesempleoGrafica()
    res.status(201).send({ status: 'OK', data: Desempleo })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const postDesempleo = async (req, res) => {
  try {
    const datosRecibidos = req.body
    const Desempleo = await DesempleoDatabase.postDesempleo(datosRecibidos)
    res.status(201).send({ status: 'OK', data: Desempleo })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const prediccionesDesempleo = async (req, res) => {
  try {
    const date = req.body
    const response = await axios.post('https://api-python.fly.dev/indicadores/desempleo/prediccion', date)
    const data = response.data // Obtener solo los datos de la respuesta
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send(error)
  }
}
module.exports = {
  getDesempleo,
  postDesempleo,
  getDesempleoGrafica,
  getDesempleoforYears,
  PostDesempleoforTrimester,
  prediccionesDesempleo
}
