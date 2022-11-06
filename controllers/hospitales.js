const { response } = require("express");

//Model
const Hospital = require("../models/hospital");

const getHospitalesController = async (req, res = response) => {

  const hosìtales =  await Hospital.find().populate('usuario','nombre');

  res.json({
    msg: "getHospitales",
    hosìtales
  });
};


const postHospitalesController = async (req, res = response) => {
  //Obtenemos los datos del hospital
  const uid = req.uid;
  const hospital = new Hospital({
    usuario: uid,
    ...req.body,
  });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      msg: "postHospital",
      hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const updateHospitalesController = (req, res = response) => {
  res.json({
    msg: "updateHospitales",
  });
};

const deleteHospitalesController = (req, res = response) => {
  res.json({
    msg: "deleteHospitales",
  });
};

module.exports = {
  getHospitalesController,
  postHospitalesController,
  updateHospitalesController,
  deleteHospitalesController,
};
