const express = require("express");
const router = express.Router();

const PibController = require("../../../controller/macroeconomicos/PibController");

router.get("/", PibController.getPib);
router.post("/save", PibController.postPib);

module.exports = router;
