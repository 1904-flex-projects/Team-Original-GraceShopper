const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');

const ProductCategory = db.define('product_category', {
  pcid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
});

module.exports = ProductCategory;
