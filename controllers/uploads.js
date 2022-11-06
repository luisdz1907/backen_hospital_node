const { response } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const { updateImage } = require("../helpers/updateImg");
const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      msg: "No es un usuario, medico u hospital",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: "No hay ningun archivo.",
    });
  }

  //Procesar imagen
  const file = req.files.imagen;

  const nombreCortado = file.name.split(".");
  const extensionArchivo = nombreCortado[nombreCortado.length - 1];

  //Validar Extension
  const extensionesValidas = ["png", "jpg", "jpeg"];
  if (!extensionesValidas.includes(extensionArchivo)) {
    return res.status(400).json({
      msg: "La extension no es valida.",
    });
  }

  //Generar nombre de imagen
  const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

  //Path para guardar la imagen
  const path = `./uploads/${tipo}/${nombreArchivo}`;

  //Mover Imagen
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({
      msg: "fileUpload",
      nombre: nombreArchivo,
    });
  });

  //Actualizar Image
  updateImage(tipo, id, nombreArchivo);
};

const returnImg = (req, res = response) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;

  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  //Imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-image.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  returnImg,
};
