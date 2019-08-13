const Sequelize = require('sequelize');
const db = require('../db');

const ProductCategory = db.define('product_category', {
  pcid1: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pcid2: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name2: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pcid3: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  name3: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = ProductCategory;
