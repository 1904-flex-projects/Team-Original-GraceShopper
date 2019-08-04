const router = require('express').Router();
const axios = require('axios');
const { Product, ProductCategory } = require('../database/index.js');

router.get('/', (req, res, next) => {
  return Product.findAll({
    include: {
      model: ProductCategory, //need to figure this out
    },
  })
    .then(products => res.status(201).json(products))
    .catch(next);
});

router.get('/:pcid1', (req, res, next) => {
  return Product.findAll({
    include: { model: ProductCategory },
    where: {
      parent_category_1: req.params.pcid1,
    },
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:pcid1/:pcid2', (req, res, next) => {
  return Product.findAll({
    where: { parent_category_2: req.params.pcid2 },
  })
    .then(products => res.json(products))
    .catch(next);
});

router.get('/:pcid1/:pcid2/:pcid3', (req, res, next) => {
  return Product.findAll({
    where: { parent_category_3: req.params.pcid3 },
  })
    .then(products => res.json(products))
    .catch(next);
});

module.exports = router;
