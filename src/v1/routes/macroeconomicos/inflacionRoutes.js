const express = require('express')
const router = express.Router()

const InflacionController = require('../../../controller/macroeconomicos/inflacionController')
const { upload } = require('../../../controller/upload')

const path = '/api/v1/inflacion'

router.get(`${path}/`, InflacionController.getInflacion)
router.get(`${path}/grafica`, InflacionController.getInflacionGrafica)
router.get(`${path}/years`, InflacionController.GetInflacionforYears)
router.post(`${path}/prediccion`, InflacionController.prediccionesInflacion)
router.post(`${path}/save`, upload, InflacionController.PostInflacionforTrimester)

module.exports = router
