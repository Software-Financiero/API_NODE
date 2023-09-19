const { PIB } = require("../models/Pib");

const getPib = async () => {
  try {
    return await PIB.find(); 
  } catch (error) {
    throw { error };
  }
};

const postPib = async () => {
  const periodo1 = "2012";
  const milesDeMillonesDePeso2 = 334.556;
  try {
    const Result = await PIB.create({
      periodo: 2001,
      milesDeMillonesDePesos:200.0
    });
    return Result;
  } catch (error) {
    throw { error };
  }
};
module.exports = {
  getPib,
  postPib,
};
