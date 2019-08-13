const faker = require('faker');
const states = require('../../states_abbrevs');

const randomState = states[Math.floor(Math.random() * states.length)];

const generateTestProfile = () => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  profile_pic_url:
    'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png',
  street_address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: randomState,
  zipcode: 10065,
  phone_number: faker.random
    .number({
      min: 1000000000,
      max: 9999999999,
    })
    .toString(),
  // user_id: 1,
});

module.exports = generateTestProfile;
