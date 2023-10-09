const express = require("express");
const router = express.Router();

const DesempleoController = require("../../../controller/macroeconomicos/desempleoController");

const path = "/api/v1/desempleo";

router.get(`${path}/`, DesempleoController.getDesempleo);
router.get(`${path}/grafica`, DesempleoController.getDesempleoGrafica);
router.post(`${path}/save`, DesempleoController.postDesempleo);

module.exports = router;
