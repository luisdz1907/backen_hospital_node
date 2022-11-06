const { Router } = require("express");
const expressfileUpload = require('express-fileupload');
const { validarJWT } = require("../middlewares/validar-jwt");
const { fileUpload, returnImg } = require('../controllers/uploads')
const router = Router();

router.use(expressfileUpload());

router.put("/:tipo/:id", validarJWT, fileUpload);
router.get("/:tipo/:foto", returnImg);

module.exports = router;
