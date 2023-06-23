const jst = require('jsonwebtoken');
const {response} = require("express");

const validarJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {

    return res.status(401).json('Nonono')
  }
  console.log(token);

  next();
}

module.exports = validarJWT;
