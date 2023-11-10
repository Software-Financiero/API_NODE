const express = require('express')
const router = express.Router()

const monedaController = require('../../../controller/microeconomicos/monedaController')

const path = '/api/v1/moneda'

router.get(`${path}/datos`, monedaController.getMoneda)
router.get(`${path}/save`, monedaController.saveMoneda)
router.post(`${path}/convert/:coin`, monedaController.convertCoin)

module.exports = router
