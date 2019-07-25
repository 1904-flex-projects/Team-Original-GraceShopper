const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const apiRoutes = require('./api_routes');

const app = express();
const publicPath = path.join(__dirname, './public');

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static(publicPath));

// api routes here

app.use('/api', apiRoutes);

app.use('/*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

//error middleware

module.exports = app;
