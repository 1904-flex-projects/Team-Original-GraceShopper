const Sequelize = require('sequelize');

const db = require('../db');

const Cart = db.define('cart', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  purchased: {
    //flag to indicate if an item has been purchased or sitting in cart
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  timeStamp: {
    //track when we make the order, need to consider updating when the flag is switched
    type: Sequelize.DATE,
    defaultValue: Date.now(),
  },
});

module.exports = Cart;
