const {Router} = require('express');
const {check} = require("express-validator");
const {usuariosGet} = require("../controllers/usuarios");
const {login} = require("../controllers/auth");
const {validarCampos} = require("../middlewares/validar-campos");
const validarJWT = require("../helpers/validar-jwt");

const router = Router();

router.post('/login',
  [
    validarJWT,
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
  ],
  login);

module.exports = router;
