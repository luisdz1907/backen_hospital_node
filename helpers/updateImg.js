const fs = require("fs");

const Hospital = require("../models/hospital");
const Medico = require("../models/medico");
const Usuario = require("../models/user");

const updateImage = async (tipo, id, nombreArchivo) => {
  const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
      // borrar la imagen anterior
      fs.unlinkSync(path);
    }
  };

  let pathViejo = "";

  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) {
        console.log("No se encontro medico por ID");
        return false;
      }

      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);

      medico.img = nombreArchivo;
      await medico.save();

      return true;
      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("No se encontro hospital por ID");
        return false;
      }

      pathViejo = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathViejo);

      hospital.img = nombreArchivo;
      await hospital.save();

      return true;

      break;

    case "usuarios":
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        console.log("No se encontro medico por ID");
        return false;
      }

      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);

      usuario.img = nombreArchivo;
      await usuario.save();

      return true;
      break;

    default:
      break;
  }
};

module.exports = {
  updateImage,
};
