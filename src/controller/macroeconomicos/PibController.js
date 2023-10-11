const PibDatabase = require('../../database/pibDatabse')
const axios = require('axios')
const { PIB } = require('../../models/Pib')

const PostPIBforTrimester = async (req, res) => {
  try {
    const fileData = req.file.buffer

    const response = await axios.post('https://api-python.fly.dev/indicadores/PIB', fileData, {
      headers: {
        'Content-Type': 'application/octet-stream' // Asegura que los datos se envíen como un archivo binario
      }
    })

    const datosConOrden = response.data.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await PIB.create(datosConOrden)

    res.status(200).send(Result)
  } catch (error) {
    res.send(error)
  }
}

const getPib = async (req, res) => {
  try {
    const pib = await PibDatabase.getPib()
    res.status(201).send({ status: 'OK', data: pib })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getPibGrafica = async (req, res) => {
  try {
    const pib = await PibDatabase.getPibGrafica()
    res.status(201).send({ status: 'OK', data: pib })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const postPib = async (req, res) => {
  try {
    const datosRecibidos = req.body
    const pib = await PibDatabase.postPib(datosRecibidos)
    res.status(201).send({ status: 'OK', data: pib })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getPib,
  postPib,
  getPibGrafica,
  PostPIBforTrimester
}
