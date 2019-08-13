const signupValidator = userObj => {
  const errors = {};
  let isValid = true;
  const {
    email,
    password1,
    password2,
    first_name,
    last_name,
    phone_number,
    street_address,
    city,
    state,
    zipcode,
  } = userObj;
  if (!email) {
    errors.email = 'please enter an email';
  }
  if (!password1 && !password2) {
    errors.password = 'please enter a password';
  }
  if (password1 !== password2) {
    errors.password = 'passwords do not match';
  }
  if (!first_name) {
    errors.first_name = 'please enter a first name';
  }
  if (!last_name) {
    errors.last_name = 'please enter a last name';
  }

  if (!phone_number) {
    errors.phone_number = 'please enter a phone number';
  }

  if (isNaN(phone_number)) {
    errors.phone_number = 'please enter a valid phone number';
  }
  if (
    !isNaN(phone_number) &&
    (parseInt(phone_number) < 1000000000 || parseInt(phone_number) > 9999999999)
  ) {
    errors.phone_number = 'please enter a valid phone number';
  }
  if (!street_address) {
    errors.street_address = 'please enter an address';
  }
  if (!city) {
    errors.city = 'please enter a city';
  }
  if (!state) {
    errors.state = 'please select a state';
  }
  if (!zipcode) {
    errors.zipcode = 'please enter a zipcode';
  }
  if (isNaN(zipcode)) {
    errors.zipcode = 'please enter a valid zipcode';
  }
  if (Object.keys(errors).length) {
    isValid = false;
  }
  return [errors, isValid];
};

module.exports = { signupValidator };
