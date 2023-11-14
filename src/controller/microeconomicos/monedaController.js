const axios = require('axios')
const { moneda } = require('../../models/moneda')
const moment = require('moment')

const getMoneda = async (req, res) => {
  try {
    const data = await moneda.find().sort({ vigenciadesde: 1 })
    if (data) {
      // Formatear todas las fechas
      for (let i = 0; i < data.length; i++) {
        data[i].vigenciadesde = moment(data[i].vigenciadesde).format('YYYY-MM-DD')
        data[i].vigenciahasta = moment(data[i].vigenciahasta).format('YYYY-MM-DD')
      }
      // Organizar por fecha y eliminar duplicados
      const organizedData = data.reduce((acc, curr) => {
        const dateStr = new Date(curr.vigenciadesde).toISOString() // Convertir a cadena para comparación

        // Verificar si ya existe un documento con la misma fecha
        const existingData = acc.find(item => new Date(item.vigenciadesde).toISOString() === dateStr)

        if (!existingData) {
        // Si no existe, agregar el documento al resultado
          acc.push(curr)
        }

        return acc
      }, [])

      // Ordenar por fecha de forma descendente
      const sortedData = organizedData.sort((a, b) => new Date(b.vigenciadesde) - new Date(a.vigenciadesde))

      if (sortedData) {
        res.status(200).send(sortedData)
      }
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
