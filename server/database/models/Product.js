const Sequelize = require('sequelize');
const db = require('../db');
const ProductCategory = require('./ProductCategory');
const Product = db.define(
  'product',
  {
    sku: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    category: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    parent_category_1: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    parent_category_2: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    parent_category_3: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_url: {
      type: Sequelize.STRING,
      defaultValue: 'https://picsum.photos/200', //will generate a random image on ever refresh of the page
    },
    // productId: {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: ProductCategory,
    //     key: 'id',
    //   },
    // },
  },
  {
    underscored: true,
  }
);

module.exports = Product;
