const Sequelize = require('sequelize');
const db = require('../db');
const states = require('../utils/states_abbrevs');

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
      defaultValue:
        'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
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
    bio: {
      type: Sequelize.TEXT,
      defaultValue:
        'My favorite site to shop on is Bester Buy because they have everything to compliment my hipster needs! ❤️',
    },
  },
  {
    underscored: true,
  }
);

module.exports = Profile;
