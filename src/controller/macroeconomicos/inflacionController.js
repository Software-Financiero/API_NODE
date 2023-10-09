const InflacionDatabase = require("../../database/inflacionDatabase");

const getInflacion = async (req, res) => {
  try {
    const Inflacion = await InflacionDatabase.getInflacion();
    res.status(201).send({ status: "OK", data: Inflacion });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getInflacionGrafica = async (req, res) => {
  try {
    const Inflacion = await InflacionDatabase.getInflacionGrafica();
    res.status(201).send({ status: "OK", data: Inflacion });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postInflacion = async (req, res) => {
  try {
    const datosRecibidos = req.body;
    const Inflacion = await InflacionDatabase.postInflacion(datosRecibidos);
    res.status(201).send({ status: "OK", data: Inflacion });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getInflacion,
  postInflacion,
  getInflacionGrafica
};
