const express = require("express");
const router = express.Router();

const DeudaController = require("../../../controller/macroeconomicos/deudaPublicaController");

const path = "/api/v1/deuda";

router.get(`${path}`, DeudaController.getDeuda);
router.get(`${path}/grafica`, DeudaController.getDeudaGrafica);
router.post(`${path}/save`, DeudaController.postDeuda);

module.exports = router;
