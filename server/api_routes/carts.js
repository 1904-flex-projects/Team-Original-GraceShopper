const router = require('express').Router();
const { Cart, Product } = require('../database/index.js');
const chalk = require('chalk');

// GET to api/carts/
// Access: private, admin only
router.get('/', (req, res, next) => {
  let userId = null;
  let sessionId = req.session.id;
  console.log('/api/cart get route session id', sessionId);
  // sessionId = sessionId.replace(/-/g, '');
  const queryObj = { where: {}, include: [Product] };

  // check for user
  if (req.session.user) {
    userId = req.session.user.user_id;
    queryObj.where.userId = userId;
  }
  // use sessionId instead
  if (!userId) {
    console.log('using session id', sessionId);
    queryObj.where.sessionSid = sessionId;
  }
  return Cart.findAll(queryObj)
    .then(cart => {
      return res.json(cart);
    })
    .catch(next);
});

// GET to api/carts/:id
// Access: private, admin only
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  if (req.session && req.session.isAdmin) {
    console.log('get route cart');
    return Cart.findOne({ where: { id } })
      .then(cart => {
        console.log(cart);
        return res.json(cart);
      })
      .catch(next);
  } else {
    res.sendStatus(401);
  }
});

// POST to api/carts
// Access: public
router.post('/', (req, res, next) => {
  const reduxCart = req.body.cart;

  // From cartReducer type: SUBMIT_ORDER
  // Has the submitOrder flag to submit instead of updating qty
  if (req.body.submitOrder) {
    return Promise.all(
      reduxCart.map(({ product, qty }) => {
        const whereObj = { purchased: false };
        if (req.session.user) {
          whereObj.userId = req.session.user.user_id;
        } else {
          whereObj.sessionSid = req.sessionID;
        }

        return Cart.findAll({ where: whereObj });
      })
    )
      .then(([submittedOrders]) => {
        return Promise.all(
          submittedOrders.map(order => {
            return order.update({ purchased: true });
          })
        );
      })
      .then(() => {
        console.log(chalk.bgGreen('Submitted order to db'));
        res.sendStatus(200);
      })
      .catch(e => {
        console.error(chalk.bgRed('Error with order submission'));
        next(e);
      });
  } else {
    // Updates qty for front end
    return Promise.all(
      reduxCart.map(({ product, qty }) => {
        const whereObj = { purchased: false };
        let userId = null;
        if (req.session.user) {
          userId = req.session.user.user_id;
          whereObj.userId = userId;
        }
        if (!userId) {
          whereObj.sessionSid = req.sessionID;
        }

        const productId = product.id;
        whereObj.productId = productId;
        return Cart.findOrCreate({
          where: whereObj,
          defaults: { qty, price: product.price },
        });
      })
    )
      .then(returnedCart => {
        return Promise.all(
          returnedCart.map((productAndCreated, i) => {
            const product = productAndCreated[0];
            const created = productAndCreated[1];

            const reduxProduct = reduxCart[i];

            if (!created && product.qty !== reduxProduct.qty) {
              return product.update({ qty: reduxProduct.qty });
            } else {
              return Promise.resolve();
            }
          })
        );
      })
      .then(() => res.sendStatus(200))
      .catch(next);
  }
});

// PUT to api/carts/:id
// Access: public
router.put('/:id', (req, res, next) => {
  const { id } = req.params;

  return Cart.findByPk(id)
    .then(cart => {
      return cart.update(req.body, { where: { id } }).then(updatedCart => {
        res.status(201).json({
          message: 'Cart has been successfully updated!',
          cart: updatedCart,
        });
      });
    })
    .catch(e => {
      console.log(chalk.redBright('Error updating cart'));
      next(e);
    });
});

// DELETE to api/carts/:id
// Access: public
router.delete('/', (req, res, next) => {
  const { user_id } = req.session.user;
  return Cart.destroy({ where: { userId: user_id } })
    .then(() => {
      console.log('destroyed');
      return res.status(200).json({
        message: 'Cart has been successfully deleted!',
      });
    })
    .catch(e => {
      console.log(chalk.redBright('Error deleting cart from database!'));
      next(e);
    });
});

module.exports = router;
