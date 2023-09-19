const PibDatabase = require("../../database/pibDatabse");

const getPib = async (req, res) => {
  try {
    const pib = await PibDatabase.getPib(); 
    res.status(201).send({ status: "OK", data: pib });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


const postPib = async (req, res) => {
  try {
    console.log("entro"); 
    const pib = await PibDatabase.postPib(); 
    res.status(201).send({ status: "OK", data: pib });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getPib,
  postPib
};
