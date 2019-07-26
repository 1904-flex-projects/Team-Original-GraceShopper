const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory2 = db.define('product_category2', {
  pcid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductCategory2;
