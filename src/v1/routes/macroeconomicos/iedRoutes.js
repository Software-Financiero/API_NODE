const express = require("express");
const router = express.Router();

const IedController = require("../../../controller/macroeconomicos/iedController");

router.get("/", IedController.getIed);
router.post("/save",IedController.postIed);

module.exports = router;
