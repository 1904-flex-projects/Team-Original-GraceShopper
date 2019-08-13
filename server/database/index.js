//import models here
const db = require('./db');
const Product = require('./models/Product');
const Review = require('./models/Review');
const Profile = require('./models/Profile');
const User = require('./models/User');
const ProductCategory = require('./models/ProductCategory');
const Session = require('./models/Session');
const Brand = require('./models/Brands');
const Cart = require('./models/Cart');

// export models here

Product.belongsTo(ProductCategory);
ProductCategory.hasMany(Product);

Profile.belongsTo(User);
User.hasOne(Profile);

Session.belongsTo(User);
User.hasMany(Session);

Product.belongsTo(Brand);
Brand.hasMany(Product);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsTo(Session);
Session.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);

module.exports = {
  db,
  Profile,
  Product,
  Review,
  User,
  ProductCategory,
  Session,
  Brand,
  Cart,
};
