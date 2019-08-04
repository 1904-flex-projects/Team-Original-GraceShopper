const express = require('express');
const morgan = require('morgan');
const path = require('path');
const chalk = require('chalk');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();

const publicPath = path.join(__dirname, './public');
const { db, Session } = require('./database');

const morganMode = process.env.NODE_ENV === 'production' ? 'tiny' : 'dev';
app.use(morgan(morganMode));

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(express.urlencoded({ extended: false }));
}

app.use(express.static(publicPath));

// session cookies
app.use(
  session({
    name: 'sid',
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'session_secret3000',
    rolling: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
    store: new SequelizeStore({
      db,
      table: 'session',
    }),
  })
);
const apiRoutes = require('./api_routes');
app.use('/api', apiRoutes);

app.get('/session', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    return res.json({ sid: req.session.id, session: req.session });
  }
  res.sendStatus(401);
});

app.get('/nsabackdoor', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    req.url = '/api/users/login';
    req.method = 'POST';
    req.body = { email: 'mark@fsaogs.com', password: 'fsanyc' };
    // console.log(req);
    return app.handle(req, res);
  }
  res.sendStatus(401);
});

app.use('/*', (req, res) => {
  console.log(chalk.red(req.session.id));
  console.log(req.cookie);
  res.sendFile(path.join(publicPath, 'index.html'));
});

//error middleware
app.use((err, req, res, next) => {
  console.log(chalk.black.bgRed('Error: ', err.stack));
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

module.exports = app;
