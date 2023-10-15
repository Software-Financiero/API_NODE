const express = require('express')
const router = express.Router()

const DeudaController = require('../../../controller/macroeconomicos/deudaPublicaController')
const { upload } = require('../../../controller/upload')

const path = '/api/v1/deuda'

router.get(`${path}`, DeudaController.getDeuda)
router.get(`${path}/years`, DeudaController.GetDeudaforYears)
router.get(`${path}/grafica`, DeudaController.getDeudaGrafica)
router.post(`${path}/save`, upload, DeudaController.PostDeudaforTrimester)

module.exports = router
