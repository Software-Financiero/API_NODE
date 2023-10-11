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

module.exports = {
  getDesempleo,
  postDesempleo,
  getDesempleoGrafica,
  PostDesempleoforTrimester
}
