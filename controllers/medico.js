const { response } = require("express");
//Model
const Medico = require('../models/medico');

const getMedicosController = (req, res = response) => {
  res.json({
    msg: "getMedicos",
  });
};
const getMedicoController = (req, res = response) => {
  res.json({
    msg: "getMedico",
  });
};
const postMedicoController = async (req, res = response) => {

  const uid = req.uid

  //Obtenemos el medico y el id del usuario
  const medico = new Medico({
    usuario: uid,
    ...req.body
  })

  try {

    const medicoDB = await medico.save();
    res.json({
      msg: "postMedico",
      medicoDB
    });


  } catch (error) {
    res.status(500).json({
      msg: 'Hable con el administrador'
    })
  }
};
const updateMedicoController = (req, res = response) => {
  res.json({
    msg: "updateMedicos",
  });
};
const deleteMedicoController = (req, res = response) => {
  res.json({
    msg: "deleteMedicos",
  });
};

module.exports = {
  getMedicosController,
  getMedicoController,
  postMedicoController,
  updateMedicoController,
  deleteMedicoController,
};
