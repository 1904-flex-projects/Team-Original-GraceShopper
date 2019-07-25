require('dotenv').config();
const { User } = require('./../../../index.js');
const faker = require('faker');

const userCreator = (userObj = {}) => {
  // default values
  const email = faker.internet.email(); // faker create a random email
  const password = 'password';
  const isAdmin = false;

  // if userObj is empty a user with default values will be created
  // if userObj has entries they will overwrite the defaults
  const user = Object.assign({}, { email, password, isAdmin }, userObj);
  return User.create(user);
};
module.exports = userCreator;
