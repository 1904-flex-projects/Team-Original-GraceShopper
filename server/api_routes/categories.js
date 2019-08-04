const Sequelize = require('sequelize');
const router = require('express').Router();
const axios = require('axios');
const { ProductCategory } = require('../database/index.js');
const { db } = require('./../database/index');
// const db = new Sequelize(process.env.DATABASE_URL, { logging: false });

router.get('/level1', (req, res, next) => {
  return db
    .query('SELECT DISTINCT pcid1, name1 from product_categories')
    .then(categories => res.status(201).json(categories[0]))
    .catch(next);
});

router.get('/level2', (req, res, next) => {
  return db
    .query('SELECT DISTINCT pcid2, name2 from product_categories')
    .then(categories => res.status(201).json(categories[0]))
    .catch(next);
});

router.get('/level3', (req, res, next) => {
  return db
    .query('SELECT DISTINCT pcid3, name3 from product_categories')
    .then(categories => res.status(201).json(categories[0]))
    .catch(next);
});

// SQL injection ?
router.get('/:pc1', (req, res, next) => {
  db.query(
    `SELECT distinct on(pcid2) pcid1, name1, pcid2, name2, pcid3, name3 FROM product_categories where pcid1=${
      req.params.pc1
    }`
  ).then(level2Cats => {
    res.status(201).send(level2Cats[0]);
  });
});

router.get('/:pc1/:pc2', (req, res, next) => {
  db.query(
    `SELECT distinct on(pcid3) pcid1, name1, pcid2, name2, pcid3, name3 FROM product_categories where pcid1=${
      req.params.pc1
    } and pcid2=${req.params.pc2}`
  ).then(level2Cats => {
    res.status(201).send(level2Cats[0]);
  });
});

module.exports = router;
