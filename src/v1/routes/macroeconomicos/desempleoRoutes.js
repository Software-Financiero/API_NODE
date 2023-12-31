const express = require('express')
const router = express.Router()

const DesempleoController = require('../../../controller/macroeconomicos/desempleoController')
const { upload } = require('../../../controller/upload')

const path = '/api/v1/desempleo'

router.get(`${path}/`, DesempleoController.getDesempleo)
router.get(`${path}/years`, DesempleoController.getDesempleoforYears)
router.post(`${path}/prediccion`, DesempleoController.prediccionesDesempleo)
router.get(`${path}/grafica`, DesempleoController.getDesempleoGrafica)
router.post(`${path}/save`, upload, DesempleoController.PostDesempleoforTrimester)

module.exports = router
