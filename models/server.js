const express = require('express')
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usuariosPath = '/api/usuarios';

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    // Directorio público
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('App running on http://localhost:' + this.port);
    });
  }

}

module.exports = Server;
