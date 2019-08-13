const router = require('express').Router();
const { Cart } = require('../database/index.js');

router.get('/', (req, res, next) => {
  if (req.session.user && req.session.user.user_id) {
    return Cart.findAll({
      where: { purchased: true, userId: req.session.user.user_id },
    })
      .then(purchases => {
        res.json(purchases);
      })
      .catch(next);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
