const express = require('express')
const router = express.Router()

const IedController = require('../../../controller/macroeconomicos/iedController')

const path = '/api/v1/ied'

router.get(`${path}/`, IedController.getIed)
router.post(`${path}/save`, IedController.postIed)

module.exports = router
