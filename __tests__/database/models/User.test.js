const { db, User } = require('../../../server/database/index.js');

const {
  hashPw,
  comparePw,
} = require('./../../../server/database/utils/bcrypt');

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
  test('should not allow duplicate email', async () => {
    const user2Obj = {
      email: 'james@gmail.com',
      password: 'password',
    };
    return expect(User.create(user2Obj)).rejects.toThrow();
  });
  test('it should hash the password before inserting the user into the db', async () => {
    const user3Obj = {
      email: 'frank@google.com',
      password: 'shouldBeHashed',
    };

    const user3 = await User.create(user3Obj);
    expect(user3.password).not.toBe(user3Obj.password);
  });
  test('update should hash incoming password', async () => {
    const user3UpdateObj = {
      email: 'asdf@msn.com',
      password: 'asdfasdf',
    };
    const user3 = await User.findOne({ where: { email: 'frank@google.com' } });
    const user3Pw = user3.password;
    const user3Update = await user3.update(user3UpdateObj);

    expect(user3Update.password).not.toEqual(user3Pw);
  });
  test('update should not rehash the previous password', async () => {
    const user4Obj = { email: 'russell@fsa.com', password: 'gitgood' };
    const user4 = await User.create(user4Obj);
    const newPassword = 'asdfasdf';

    const user4Update = await user4.update({ password: newPassword });

    const user4PwHash = user4Update.password;

    const isMatch = await comparePw(newPassword, user4PwHash);
    expect(isMatch).toBe(true);
  });
  test('update should not re-hash pw if password is not updated', async () => {
    const russell = await User.findOne({ where: { email: 'russell@fsa.com' } });
    const russellPw = russell.password;
    const russellUpdate = await russell.update({ email: 'russell@yahoo.com' });
    expect(russellUpdate.password).toEqual(russellPw);
  }); // possibly use a snapshot here
});
