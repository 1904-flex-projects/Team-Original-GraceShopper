const Sequelize = require('sequelize');
const db = require('../db');
const chalk = require('chalk');

const Session = db.define(
  'session',
  {
    sid: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    visit_count: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    expires: {
      type: Sequelize.DATE,
    },
    data: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
  }
);

// Session.beforeUpdate(session => {
//   session.visit_count++;
//   console.log(chalk.bgGreen('Successfully updated visit count.'));
// });

module.exports = Session;
