const jwt = require('jsonwebtoken');

const generarJwt = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = {uid};

    jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
      expiresIn: '4h'
    }, (error, token) => {
      if (error) {
        console.log(error);

        reject('Nones.');
      } else {
        resolve(token);
      }
    });

  });
}

module.exports = {generarJwt};
