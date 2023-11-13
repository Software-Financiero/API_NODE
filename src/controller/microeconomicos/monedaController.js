const axios = require('axios')
const { moneda } = require('../../models/moneda')

const getMoneda = async (req, res) => {
  try {
    const data = await moneda.find().sort({ vigenciadesde: -1 })
    if (data) {
      res.status(200).send(data)
    }
  } catch (error) {
    console.log(error)
  }
}
const saveMoneda = async (req, res) => {
  try {
    const response = await axios.get('https://api-python.fly.dev/indicadores/moneda/historical')
    const monedahistorical = response.data
    if (monedahistorical !== null) {
      const dataSave = await moneda.create(monedahistorical)
      res.status(200).json(dataSave)
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

const convertCoin = async (req, res) => {
  try {
    const coin = req.params.coin
    const response = await axios.post(`https://api-python.fly.dev/indicadores/moneda/convert/${coin}`, req.body)
    const result = response.data
    if (response !== null) {
      res.status(200).send(result)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = { saveMoneda, convertCoin, getMoneda }
