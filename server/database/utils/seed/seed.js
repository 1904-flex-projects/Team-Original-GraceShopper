// seed shit here
const {
  db,
  Profile,
  Product,
  Review,
  User,
  ProductCategory1,
  ProductCategory2,
  ProductCategory3,
} = require('../../index');

const usersSeed = require('./data/users');
const userCreator = require('./creators/userCreator');
const productSeed = require('./data/products');
const productCreator = require('./creators/productCreator');
const productcategory1 = require('./data/productcategory1');
const productcategory2 = require('./data/productcategory2');
const productcategory3 = require('./data/productcategory3');

const seed = async () => {
  try {
    console.log('syncing db');
    await db.sync({ force: true });

    console.log('seeding users');
    // seed from an array of entries
    await Promise.all(usersSeed.map(user => userCreator(user)));
    // create n random entries
    const usersSeedArr = Array(10).fill();
    await Promise.all(usersSeedArr.map(() => userCreator()));

    console.log('seeding products');
    await Promise.all(
      productSeed.map(products => {
        return productCreator(products);
      })
    );

    console.log('seeding PC1');
    await Promise.all(
      productcategory1.map(pc => {
        return ProductCategory1.create(pc);
      })
    );

    console.log('seeding PC2');
    await Promise.all(
      productcategory2.map(pc => {
        return ProductCategory2.create(pc);
      })
    );

    console.log('seeding PC3');
    await Promise.all(
      productcategory3.map(pc => {
        return ProductCategory3.create(pc);
      })
    );

    console.log('quitting seed');
    await db.close();
  } catch (e) {
    console.error('seeding error', e);
  }
};

seed();
