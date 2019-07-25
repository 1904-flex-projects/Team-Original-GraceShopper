require('dotenv').config();
const { Product } = require('../../../index.js');
const faker = require('faker');

const productCreator = productObj => {
  //  default values
  const sku = faker.random.uuid(); // faker create a random email
  // const password = 'password';
  // const isAdmin = false;

  // if userObj is empty a user with default values will be created
  // if userObj has entries they will overwrite the defaults
  const product = Object.assign({}, { sku }, productObj);
  return Product.create(product);
};
module.exports = productCreator;
