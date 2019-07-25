require('dotenv').config();
const { db, User } = require('../../../server/database/index.js');

beforeAll(async () => {
  await db.sync({ force: true });
});
afterAll(async () => {
  await db.close();
});

describe('adding a user', () => {
  const userObj = {
    email: 'james@gmail.com',
    password: 'password',
  };
  test('it should create a user when all fields are valid', async () => {
    const user = await User.create(userObj);
    expect(user.email).toEqual('james@gmail.com');
    expect(user.password).toBeDefined();
    expect(user.isAdmin).toBe(false);
  });
  test.todo('should not allow duplicate email');
  test.todo('pw should be hashed correctly'); // possibly use a snapshot here
});
