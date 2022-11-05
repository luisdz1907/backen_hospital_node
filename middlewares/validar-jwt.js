const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  //Leer Token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    //Verificamos el token
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);

    //Enviamos la informacion del token
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Token no valido",
    });
  }

};

module.exports = {
  validarJWT,
};
