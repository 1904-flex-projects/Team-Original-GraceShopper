require('dotenv').config();
const { User, Cart } = require('./../../../index.js');
const faker = require('faker');

const userCreator = (userObj = {}) => {
  // default values
  const email = faker.internet.email(); // faker create a random email
  const password = 'password';
  const isAdmin = false;

  // if userObj is empty a user with default values will be created
  // if userObj has entries they will overwrite the defaults
  const user = Object.assign({}, { email, password, isAdmin }, userObj);
  return User.create(user).then(user => {
    // return Cart.create({ userId: user.id }).then(res => {
    //   return res;
    // });
    return user;
  });
};
module.exports = userCreator;
