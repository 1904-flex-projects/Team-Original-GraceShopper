const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory1 = db.define('product_category1', {
  pcid: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductCategory1;
