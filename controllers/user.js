const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

// GET ALL USUARIOS
const getUsuariosController = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json({
    usuarios,
    uid: req.uid
  });
};

//POST USUARIO
const postUsuarioController = async (req, res = response) => {
  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        msg: "El correo ya esta registrado",
      });
    }

    //Obtenemos los datos del usuarios
    const usuario = new Usuario(req.body);

    //Encriptar Contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar Usuario
    await usuario.save();

    //Generar el token - JWT
    const token = await generateJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error inesperado... revisar logs",
    });
  }
};

//UPDATE USUARIO
const updateUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userdb = await Usuario.findById(uid);

    if (!userdb) {
      return res.status(400).json({
        msg: "No existe el usuario con ese id",
      });
    }

    const { password, google, email, ...campos } = req.body;

    //Validar los correos del usuario sea igual al que le envio
    if (userdb.email !== email) {
      const existeEmail = await Usuario.findOne({ email });

      if (existeEmail) {
        return res.status(400).json({
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    //Actualizar Usuario
    const userUpdate = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      userUpdate,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error inesperado",
    });
  }
};

//DELETE USUARIO
const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userdb = await Usuario.findById(uid);

    if (!userdb) {
      return res.status(400).json({
        msg: "No existe el usuario con ese id",
      });
    }

    await Usuario.findByIdAndDelete(uid);

    res.json({
      msg: "Usuario eliminado",
      id: uid,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "Error inesperado",
    });
  }
};

module.exports = {
  getUsuariosController,
  postUsuarioController,
  updateUsuario,
  deleteUser,
};
