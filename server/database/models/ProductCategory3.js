const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory3 = db.define('product_category3', {
  pcid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductCategory3;
