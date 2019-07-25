require('dotenv').config();

const { db } = require('./database');
const app = require('./server');

const { PORT } = process.env;

db.sync().then(() => {
  console.log('db synced');
  app.listen(PORT, () => {
    console.log('i livve');
  });
});
