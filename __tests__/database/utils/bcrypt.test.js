const {
  hashPw,
  comparePw,
} = require('./../../../server/database/utils/bcrypt');

describe('hashing function', () => {
  test('it should hash a password', async () => {
    const plainTextPw = 'helloWorld';
    const hashedPw = await hashPw(plainTextPw);
    console.log('hashed pw', hashedPw);
    expect(hashedPw).not.toBe(plainTextPw);
  });
});
describe('comparing password to hash', () => {
  test('it should return true when the password is correct', async () => {
    const plainTextPw = 'supersecretpassword';
    const hashedPw = await hashPw(plainTextPw);
    const res = await comparePw(plainTextPw, hashedPw);
    expect(res).toBe(true);
  });
  test('it should return false when the password is incorrect', async () => {
    const correctPassword = 'myPassword';
    const incorrectPassword = 'notMyPassword';
    const hashedPw = await hashPw(correctPassword);

    const incorrectRes = await comparePw(incorrectPassword, hashedPw);
    const correctRes = await comparePw(correctPassword, hashedPw);

    expect(incorrectRes).toBe(false);
    expect(correctRes).toBe(true);
  });
});
