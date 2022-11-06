const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");

const { validarJWT } = require("../middlewares/validar-jwt");

const {
  deleteMedicoController,
  getMedicosController,
  postMedicoController,
  updateMedicoController,
} = require("../controllers/medico");

const router = Router();

router.get("/", validarJWT, getMedicosController);

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre del medico es necesario.").not().isEmpty(),
    check("hospital", "El id del hospital debe ser valido.").isMongoId(),
    validarCampos,
  ],
  postMedicoController
);

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre del medico es necesario.").not().isEmpty(),
    check("hospital", "El id del hospital debe ser valido.").isMongoId(),
    validarCampos,
  ],
  updateMedicoController
);

router.delete("/:id", validarJWT, deleteMedicoController);
module.exports = router;
