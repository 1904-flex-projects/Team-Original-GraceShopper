const bcrypt = require('bcrypt');

const hashPw = (plainTextPw, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(plainTextPw, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const comparePw = (plainTextPw, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainTextPw, hash, (err, res) => {
      if (err) reject(err);
      // boolean
      resolve(res);
    });
  });
};

module.exports = { hashPw, comparePw };
