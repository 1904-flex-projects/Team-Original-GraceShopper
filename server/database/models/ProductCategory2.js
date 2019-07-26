const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory2 = db.define('product_category', {
  pcid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductCategory2;
