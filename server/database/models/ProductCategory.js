const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory = db.define('product_category', {
  pcid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductCategory;
