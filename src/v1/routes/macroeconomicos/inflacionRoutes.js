const express = require("express");
const router = express.Router();

const InflacionController = require("../../../controller/macroeconomicos/inflacionController");

router.get("/", InflacionController.getInflacion);
router.post("/save", InflacionController.postInflacion);

module.exports = router;
