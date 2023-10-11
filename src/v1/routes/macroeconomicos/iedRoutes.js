const express = require('express')
const router = express.Router()

const { upload } = require('../../../controller/upload')
const IedController = require('../../../controller/macroeconomicos/iedController')

const path = '/api/v1/ied'

router.get(`${path}/`, IedController.getIed)
router.get(`${path}/grafica`, IedController.getIedGrafica)
router.post(`${path}/save`, upload, IedController.PostIEDforTrimester)

module.exports = router
