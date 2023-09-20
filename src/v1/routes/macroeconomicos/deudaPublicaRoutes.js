const express = require("express");
const router = express.Router();

const DeudaController = require("../../../controller/macroeconomicos/deudaPublicaController");

router.get("/", DeudaController.getDeuda);
router.post("/save",DeudaController.postDeuda);

module.exports = router;
