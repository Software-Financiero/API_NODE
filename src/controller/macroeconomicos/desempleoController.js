const DesempleoDatabase = require("../../database/desempeloDatabase");

const getDesempleo = async (req, res) => {
  try {
    const Desempleo = await DesempleoDatabase.getDesempleo(); 
    res.status(201).send({ status: "OK", data: Desempleo });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const postDesempleo = async (req, res) => {
  try {
    const datosRecibidos = req.body;
    const Desempleo = await DesempleoDatabase.postDesempleo(datosRecibidos);
    res.status(201).send({ status: "OK", data: Desempleo });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getDesempleo,
  postDesempleo
};
