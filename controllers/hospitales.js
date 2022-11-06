const { response } = require("express");

//Model
const Hospital = require("../models/hospital");

const getHospitalesController = async (req, res = response) => {
  const hosìtales = await Hospital.find().populate("usuario", "nombre");

  res.json({
    msg: "getHospitales",
    hosìtales,
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

const updateHospitalesController = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        msg: "Hospital no encontrado por ID.",
      });
    }

    const newHospital = {
      ...req.body,
      usuario: uid,
    };

    const updateHospital  = await Hospital.findByIdAndUpdate(id, newHospital, { new: true })

    res.json({
      msg: "Hospital actualizado.",
      updateHospital
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const deleteHospitalesController = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(400).json({
        msg: "Hospital no encontrado por ID.",
      });
    }
 
    await Hospital.findByIdAndDelete( id )

    res.json({
      msg: "Hospital eliminado."
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getHospitalesController,
  postHospitalesController,
  updateHospitalesController,
  deleteHospitalesController,
};
