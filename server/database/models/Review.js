const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  rating: {
    type: Sequelize.DECIMAL(2, 1),
    allowNull: false,
    validate: {
      notEmty: true,
      min: 1,
      max: 5,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Review;
