const DeudaDatabase = require('../../database/deudaPublicaDatabase')
const { Deuda } = require('../../models/DeudaPublica')
const axios = require('axios')

const PostDeudaforTrimester = async (req, res) => {
  try {
    const fileData = req.file.buffer

    const response = await axios.post('https://api-python.fly.dev/indicadores/deuda', fileData, {
      headers: {
        'Content-Type': 'application/octet-stream' // Asegura que los datos se envíen como un archivo binario
      }
    })

    const datosConOrden = response.data.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await Deuda.create(datosConOrden)

    res.status(200).send(Result)
  } catch (error) {
    res.send(error)
  }
}
const getDeuda = async (req, res) => {
  try {
    const Deuda = await DeudaDatabase.getDeuda()
    res.status(201).send({ status: 'OK', data: Deuda })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getDeudaGrafica = async (req, res) => {
  try {
    const Deuda = await DeudaDatabase.getDeudaGrafica()
    res.status(201).send({ status: 'OK', data: Deuda })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const postDeuda = async (req, res) => {
  try {
    const datosRecibidos = req.body
    const Deuda = await DeudaDatabase.postDeuda(datosRecibidos)
    res.status(201).send({ status: 'OK', data: Deuda })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getDeuda,
  postDeuda,
  getDeudaGrafica,
  PostDeudaforTrimester
}
