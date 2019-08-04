const Sequelize = require('sequelize');
const db = require('../db');

const Brand = db.define('brand', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  brand_image_url: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://pbs.twimg.com/profile_images/1145685694238605312/q4JCNy_X_400x400.jpg',
    validate: {
      isURL: true,
    },
  },
});

module.exports = Brand;
