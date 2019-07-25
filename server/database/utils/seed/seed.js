// seed shit here
const { db, Profile, Product, Review, User } = require('../../index');

const usersSeed = require('./data/users');
const userCreator = require('./creators/userCreator');
const productSeed = require('./data/products');
const productCreator = require('./creators/productCreator');

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

    console.log('quitting seed');
    await db.close();
  } catch (e) {
    console.error('seeding error', e);
  }
};

seed();
