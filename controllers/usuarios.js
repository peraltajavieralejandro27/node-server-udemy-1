const {response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const query = {estado: true};

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .limit(limite)
      .skip(desde)
  ]);

  res.json({total, usuarios});
};

const usuariosPost = async (req, res = response) => {


  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({
    nombre,
    correo,
    password,
    rol
  });

  //Encriptar
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar
  await usuario.save();

  res
    .status(201)
    .json({
      msg: "post API - Controlador",
      usuario
    })
};
const usuariosPut = async (req, res = response) => {
  const {id} = req.params;
  const {password, google, correo, ...resto} = req.body;

  // const usuarioExiste = Usuario.findOne({id});
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(403).json({
    msg: "put API - Controlador",
    id
  })
};
const usuariosPatch = (req, res = response) => {
  res.status(403).json({
    msg: "patch API - Controlador"
  })
};
const usuariosDelete = async (req, res = response) => {
  const {id} = req.params;

  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

  res.status(403).json(id);
};

module.exports = {usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete};
