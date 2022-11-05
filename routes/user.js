const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsuariosController,
  postUsuarioController,
  updateUsuario,
  deleteUser,
} = require("../controllers/user");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", validarJWT, getUsuariosController);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El apellido es obligatorio").isEmail(),
    validarCampos,
  ],
  postUsuarioController
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    check("email", "El apellido es obligatorio").isEmail(),
    validarCampos,
  ],
  updateUsuario
);

router.delete("/:id",validarJWT,deleteUser);
module.exports = router;
