const Sequelize = require('sequelize');
const db = require('../db');
const states = require('../utils/states_abbrevs');

const Profile = db.define('profile', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  street_address: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      isIn: [states],
    },
  },

  zipcode: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
    },
  },
  phone_number: {
    type: Sequelize.INTEGER,
    defaultValue: 424 - 242 - 4242,
  },
});

module.exports = Profile;
