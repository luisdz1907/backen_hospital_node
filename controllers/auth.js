const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

//METHOD LOGIN
const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const userDB = await Usuario.findOne({ email });
    //Verificamos que el email sea valido
    if (!userDB) {
      return res.status(404).json({
        msg: "Email no valido",
      });
    }

    //Verficar Contraseña
    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      res.status(400).json({
        msg: "Contraseña no valida ",
      });
    }

    //Generar el token - JWT
    const token = await generateJWT(userDB.id);

    res.json({
      token,
      userDB
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const renewToken = async (req, res) => {
  const id = req.uid;

  //Generar el token - JWT
  const token = await generateJWT(id);

  const usuario = await Usuario.findById(id)
  console.log(usuario)
  res.json({
    token, 
    usuario
  });
};
module.exports = {
  login,
  renewToken,
};
