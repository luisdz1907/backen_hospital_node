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

const updateMedicoController = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        msg: "Medico no encontrado por ID.",
      });
    }

    const newMedico = {
      ...req.body,
      usuario: uid,
    };

    const updateMedico  = await Medico.findByIdAndUpdate(id, newMedico, { new: true })

    res.json({
      msg: "Medico actualizado.",
      updateMedico
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const deleteMedicoController = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(400).json({
        msg: "Medico no encontrado por ID.",
      });
    }
 
    await Medico.findByIdAndDelete( id )

    res.json({
      msg: "Medico eliminado."
    });
  } catch (error) {
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getMedicosController,
  postMedicoController,
  updateMedicoController,
  deleteMedicoController,
};
