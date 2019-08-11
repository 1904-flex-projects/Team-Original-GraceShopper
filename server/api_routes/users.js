const router = require('express').Router();
const { User, Profile, Session } = require('../database/index.js');
const chalk = require('chalk');

const { signupValidator } = require('./utils/userValidation');

// GET to api/users/
// Access: private, admin only
router.get('/', (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return User.findAll({ include: [Profile], order: ['id'] })
      .then(users => res.json(users))
      .catch(next);
  } else {
    res.sendStatus(401);
  }
});

// Route: POST to api/users/login
// Access: public
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: 'Invalid login credentials' });
  }
  User.authenticate(email, password)
    .then(user => {
      req.session.user = {
        email: user.email,
        user_id: user.user_id,
      };
      req.session.isAdmin = user.isAdmin;
      req.session.isLoggedIn = true;
      req.session.save(() => {
        res.status(201).json({
          email: user.email,
          profile: user.profile,
          isAdmin: user.isAdmin,
          user_id: user.user_id,
        });
      });
      return Promise.resolve();
    })
    .catch(next);
});

// Route: POST to api/users/logout
// Access: public
router.post('/logout', (req, res, next) => {
  // save cart to db
  req.session.destroy(() => {
    res.status(200).send({ message: 'successfully logged out' });
  });
});

// Route: GET to api/users/checklogin
//Access: public
router.get('/checklogin', (req, res, next) => {
  if (req.session.isLoggedIn) {
    User.findByPk(req.session.user.user_id, { include: [Profile] }).then(
      user => {
        res.status(201).json({
          email: user.email,
          profile: user.profile,
          isAdmin: user.isAdmin,
          user_id: user.user_id,
        });
      }
    );
  } else {
    res.sendStatus(204);
  }
});

// POST to api/users/signup
// Access: public
router.post('/signup', (req, res, next) => {
  const [errorsResponse, isValid] = signupValidator(req.body);
  if (!isValid) {
    return res.status(400).send({ errorsResponse });
  }
  const { email, password1 } = req.body;
  User.findOrCreate({ where: { email }, defaults: { password: password1 } })
    .then(userAndCreated => {
      const user = userAndCreated[0];
      const wasCreated = userAndCreated[1];
      if (!wasCreated) {
        errorsResponse.email = 'email already taken';
        return res.status(400).send({ errorsResponse });
      } else {
        return Promise.all([user, Profile.create(req.body)]);
      }
    })
    .then(([user, profile]) => {
      return profile.update({ userId: user.id });
    })
    .then(() => {
      return res.status(200).send({ message: 'successfully created new user' });
    })
    .catch(e => {
      next(e);
      const errorsFromSequelize = e.errors;
      if (errorsFromSequelize.some(error => error.path === 'email')) {
        errorsResponse.email = 'invalid email';
      }
      if (errorsFromSequelize.some(error => error.path === 'password')) {
        errorsResponse.password = 'password can not be empty';
      }
      if (Object.keys(errorsResponse).length) {
        return res.status(400).send({ errorsResponse });
      }
      next(e);
    });
});

// GET to api/users/:id
// Access: private, admin only
router.get('/:id', (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    const { id } = req.params;
    return User.findByPk(id)
      .then(user => res.json(user))
      .catch(e => {
        console.log(chalk.redBright('Unable to find user in database!'));
        next(e);
      });
  }
  res.sendStatus(401);
});

//GET to api/users/:id/session
// Acess: Private
router.get('/:id/session', (req, res, next) => {
  const { id } = req.params;
  if (
    (req.session && req.session.isAdmin) ||
    req.session.user.user_id === parseInt(id)
  ) {
    res.status(200).json({ isActiveSession: true });
  } else {
    res.status(205).send({ isActiveSession: false });
  }
});
// POST to api/users/
// Access: private, admin only
// Note: this is not the signup route
router.post('/', (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    const { body } = req;
    return User.create(body)
      .then(newUser => res.json(newUser))
      .catch(e => {
        console.log(chalk.redBright('Error creating/adding new user!'));
        next(e);
      });
  } else {
    res.sendStatus(401);
  }
});

// PUT to api/users/:id
// Access; private
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  if (
    (req.session && req.session.isAdmin) ||
    req.session.user.user_id === parseInt(id)
  ) {
    if (!id || !Object.keys(req.body).length) {
      return res.sendStatus(204);
    }
    // normal users can't change their admin status
    if (!req.session.isAdmin) {
      req.body.isAdmin = false;
    }

    Promise.all([User.findByPk(id), Profile.findOne({ where: { userId: id } })])
      .then(([user, profile]) => {
        return Promise.all([
          user.update(req.body),
          profile.update(req.body.profile),
        ]);
      })
      .then(() => {
        res.status(201).send({ message: 'success' });
      })
      .catch(e => {
        console.log(chalk.redBright('Error updating user: '));
        next(e);
      });
  } else {
    res.sendStatus(401);
  }
});

// DELETE to api/users/:id
// Access; private
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  if (
    (req.session && req.session.isAdmin) ||
    req.session.user.user_id === parseInt(id)
  ) {
    return User.destroy({ where: { id } })
      .then(() =>
        res.status(200).json({ message: 'User has been successfully deleted!' })
      )
      .catch(e => {
        console.log(chalk.redBright('Error deleting user from database!'));
        next(e);
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
