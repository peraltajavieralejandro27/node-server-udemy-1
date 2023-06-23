const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const {generarJwt} = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const {correo, password} = req.body;

  try {
    // Verificar si el email existe.
    const usuario = await Usuario.findOne({correo});

    if (!usuario) {
      return res
        .status(400)
        .json('Usuario/Password inválidos');
    }

    if (!usuario.estado) {
      return res
        .status(400)
        .json('Usuario/Password inválidos');
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res
        .status(400)
        .json('Usuario/Password inválidos');
    }
    // Si el usuario está activo
    const token = await generarJwt(usuario.id);

    // Verificar pass

    // Generar JWT

    return res.json({usuario, token});
  } catch (error) {
    console.log(error);

    return res.status(500)
      .json({
        msg: 'Algo malió sal...'
      })
  }

}

module.exports = {login}
