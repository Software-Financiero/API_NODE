const express = require('express')
const router = express.Router()

const InflacionController = require('../../../controller/macroeconomicos/inflacionController')

const path = '/api/v1/inflacion'

router.get(`${path}/`, InflacionController.getInflacion)
router.post(`${path}/save`, InflacionController.postInflacion)

module.exports = router