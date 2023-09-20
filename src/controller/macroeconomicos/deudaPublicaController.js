const DeudaDatabase = require("../../database/deudaPublicaDatabase");

const getDeuda = async (req, res) => {
  try {
    const Deuda = await DeudaDatabase.getDeuda(); 
    res.status(201).send({ status: "OK", data: Deuda });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postDeuda = async (req, res) => {
  try {
    const datosRecibidos = req.body;
    const Deuda = await DeudaDatabase.postDeuda(datosRecibidos);
    res.status(201).send({ status: "OK", data: Deuda });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getDeuda,
  postDeuda
};
