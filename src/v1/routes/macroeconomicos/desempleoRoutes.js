const express = require("express");
const router = express.Router();

const DesempleoController = require("../../../controller/macroeconomicos/desempleoController");

router.get("/", DesempleoController.getDesempleo);
router.post("/save",DesempleoController.postDesempleo);

module.exports = router;
