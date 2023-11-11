const { parentPort } = require('node:worker_threads')
const cron = require('node-cron')
const axios = require('axios')

parentPort.on('message', async (message) => {
  if (message === 'start') {
    cron.schedule('*/30 * * * *', async () => {
      await updateCoinLive()
    })
    cron.schedule('*/60 * * * *', async () => {
      await updateCoinData()
    })
  }
})

const updateCoinLive = async () => {
  try {
    const response = await axios.get('https://api-python.fly.dev/indicadores/moneda/live')
    const monedaLive = response.data

    parentPort.postMessage({ message: 'live', monedaLive })
  } catch (error) {
    console.log(error)
  }
}

const updateCoinData = async (message) => {
  try {
    const response = await axios.get('http://localhost:3007/api/v1/moneda/save')
    if (response.status === 200) {
      console.log('Moneda Actualizada')
    }
  } catch (error) {
    console.log(error)
  }
}
