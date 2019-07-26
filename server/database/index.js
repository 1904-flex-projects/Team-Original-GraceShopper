//import models here
const db = require('./db');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Profile = require('./models/Profile');
const User = require('./models/User');
const ProductCategory1 = require('./models/ProductCategory1');
const ProductCategory2 = require('./models/ProductCategory2');
const ProductCategory3 = require('./models/ProductCategory3');
// export models here
module.exports = {
  db,
  Profile,
  Product,
  Review,
  User,
  ProductCategory1,
  ProductCategory2,
  ProductCategory3,
};
