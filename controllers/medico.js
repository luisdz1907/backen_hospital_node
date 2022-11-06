const { response } = require("express");
//Model
const Medico = require('../models/medico');

const getMedicosController = async (req, res = response) => {

  const medico = await Medico.find()
                .populate('usuario','nombre')
                .populate('hospital','nombre')

  res.json({
    msg: "getMedicos",
    medico
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
  postMedicoController,
  updateMedicoController,
  deleteMedicoController,
};
