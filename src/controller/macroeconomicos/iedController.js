const IedDatabase = require('../../database/iedDatabase')
const { IED } = require('../../models/IED')
const axios = require('axios')

const PostIEDforTrimester = async (req, res) => {
  try {
    const fileData = req.file.buffer

    const response = await axios.post('https://api-python.fly.dev/indicadores/IED', fileData, {
      headers: {
        'Content-Type': 'application/octet-stream' // Asegura que los datos se envíen como un archivo binario
      }
    })

    const datosConOrden = response.data.map((dato, index) => ({
      ...dato,
      Orden: index + 1
    }))

    const Result = await IED.create(datosConOrden)

    res.status(200).send(Result)
  } catch (error) {
    res.send(error)
  }
}

const GetIEDforYears = async (req, res) => {
  try {
    const data = await IED.find({ Ano: { $gte: 2020 } }).sort({ Ano: 1, Trimestre: 1 })

    const iedPorAño = data.reduce((resultado, objeto) => {
      const ano = objeto.Ano
      const pib = objeto.Total

      if (resultado[ano]) {
        resultado[ano] += pib
      } else {
        resultado[ano] = pib
      }
      return resultado
    }, {})

    // Convierte el objeto en un arreglo de objetos
    const iedAnualArray = Object.entries(iedPorAño).map(([ano, total]) => ({
      Ano: ano,
      Total: total
    }))

    // Imprime el resultado
    res.status(200).send(iedAnualArray)
  } catch (error) {
    res.send(error)
  }
}

const getIed = async (req, res) => {
  try {
    const Ied = await IedDatabase.getIed()
    res.status(201).send({ status: 'OK', data: Ied })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getIedGrafica = async (req, res) => {
  try {
    const Ied = await IedDatabase.getIedGrafica()
    res.status(201).send({ status: 'OK', data: Ied })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const postIed = async (req, res) => {
  try {
    const datosRecibidos = req.body
    const ied = await IedDatabase.postIed(datosRecibidos)
    res.status(201).send({ status: 'OK', data: ied })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getIed,
  postIed,
  getIedGrafica,
  GetIEDforYears,
  PostIEDforTrimester
}
