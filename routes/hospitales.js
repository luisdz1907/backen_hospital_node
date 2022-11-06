const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitalesController,
  deleteHospitalesController,
  postHospitalesController,
  updateHospitalesController,
} = require("../controllers/hospitales");

const router = Router();

router.get("/", validarJWT, getHospitalesController);

router.post("/", [
  validarJWT,
  check('nombre', 'El nombre del hospital es necesario.').not().isEmpty(),
  validarCampos
], postHospitalesController);

router.put("/:id", [], updateHospitalesController);

router.delete("/:id", validarJWT, deleteHospitalesController);
module.exports = router;
