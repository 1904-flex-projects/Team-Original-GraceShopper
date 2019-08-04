const Sequelize = require('sequelize');
const db = require('../db');
const states = require('../utils/states_abbrevs');
const faker = require('faker');

const Profile = db.define(
  'profile',
  {
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
    profile_pic_url: {
      type: Sequelize.TEXT,
      defaultValue: faker.image.people(),
      validate: {
        isURL: true,
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
      type: Sequelize.STRING,
      defaultValue: '4242424242',
      validate: {
        len: [10],
      },
    },
  },
  {
    underscored: true,
  }
);

module.exports = Profile;
