const { response } = require("express");
const Usuario = require("../models/user");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

//Metodo que obtiene todo los datos
const getTodo = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  //Expresion regualar
  const regex = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.json({
    usuarios,
    medicos,
    hospitales,
  });
};

const getDocumentoColeccion = async (req, res = response) => {
  const busqueda = req.params.busqueda;
  const tabla = req.params.tabla;
  const regex = new RegExp(busqueda, "i");

  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
                         .populate('usuario', 'nombre')
                         .populate('hospital', 'nombre')
      break;

    case "hospitales":
      data = await Hospital.find({ nombre: regex })
                           .populate('usuario','nombre')
      break;

    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;

    default:
      return res.json({
        msg: "La tabla tiene que ser usuarios/medicos/hospitales",
      });
  }

  res.json({
    resultados: data,
  });
};

module.exports = {
  getTodo,
  getDocumentoColeccion,
};
