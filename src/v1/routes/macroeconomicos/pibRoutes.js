const express = require('express')
const router = express.Router()

const PibController = require('../../../controller/macroeconomicos/PibController')
const { upload } = require('../../../controller/upload')

const path = '/api/v1/pib'

router.get(`${path}/`, PibController.getPib)
router.get(`${path}/grafica`, PibController.getPibGrafica)
router.get(`${path}/prediccion`, PibController.prediccionesPIB)
router.get(`${path}/years`, PibController.GetPIBforYears)
router.post(`${path}/save`, upload, PibController.PostPIBforTrimester)

module.exports = router
