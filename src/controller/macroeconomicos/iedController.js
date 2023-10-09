const IedDatabase = require("../../database/iedDatabase");

const getIed = async (req, res) => {
  try {
    const Ied = await IedDatabase.getIed();
    res.status(201).send({ status: "OK", data: Ied });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getIedGrafica = async (req, res) => {
  try {
    const Ied = await IedDatabase.getIedGrafica();
    res.status(201).send({ status: "OK", data: Ied });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postIed = async (req, res) => {
  try {
    const datosRecibidos = req.body;
    const ied = await IedDatabase.postIed(datosRecibidos);
    res.status(201).send({ status: "OK", data: ied });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getIed,
  postIed,
  getIedGrafica,
};
