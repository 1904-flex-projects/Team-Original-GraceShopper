const { db, User } = require('./../../../server/database/index.js');
const userCreator = require('./../../../server/database/utils/seed/creators/userCreator');

beforeEach(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe('default user creation', () => {
  test('it should seed a random user in the db', async () => {
    await userCreator();
    const users = await User.findAll();
    expect(users.length).toBe(1);
  });
  test('it should create a user with the given params', async () => {
    const user = await userCreator({ email: 'mark@yahoo.com', isAdmin: true });
    expect(user.email).toBe('mark@yahoo.com');
    expect(user.isAdmin).toBe(true);
  });
});
