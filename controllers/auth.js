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
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
