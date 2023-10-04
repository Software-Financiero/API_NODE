const express = require('express')
const router = express.Router()

const PibController = require('../../../controller/macroeconomicos/PibController')

const path = '/api/v1/pib'

router.get(`${path}/`, PibController.getPib)
router.post(`${path}/save`, PibController.postPib)

module.exports = router
