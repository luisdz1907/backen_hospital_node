const { response } = require("express");

//Model
const Hospital = require("../models/hospital");

const getHospitalesController = (req, res = response) => {
  res.json({
    msg: "getHospitales",
  });
};
const getHospitalController = (req, res = response) => {
  res.json({
    msg: "getHospital",
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
      msg: "getpostHospital",
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
  getHospitalController,
  postHospitalesController,
  updateHospitalesController,
  deleteHospitalesController,
};
