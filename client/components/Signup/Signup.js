import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useForm from './../../hooks/useForm';
import { SIGNUP_FORM_COL, ERROR_MSG } from './styles';
import { loginThunk } from './../../redux';
import stateAbbrevs from './states_abbrevs';
const Signup = props => {
  const { login, isLoggedIn } = props;

  const onSubmit = (valuesFromHook, setValuesFromHook) => {
    const values = valuesFromHook;
    const setValues = setValuesFromHook;
    axios
      .post('/api/users/signup', values)
      .then(() => {
        login(values.email, values.password1);
      })
      .catch(e => {
        if (e.response.data) {
          const errorsResponse = e.response.data.errorsResponse;
          if (e.response.data.errorsResponse) {
            setValues(vals => ({ ...vals, errors: errorsResponse }));
          }
        }
      });
  };
  const testInfo = {
    email: 'mike@gmail.com',
    password1: 'password',
    password2: 'password',
    first_name: 'mark',
    last_name: 'will',
    phone_number: '1231231234',
    street_address: '12312312',
    city: 'city',
    state: 'WA',
    zipcode: '89723',
    errors: { email: '', password: '', first_name: '', last_name: '' },
  };
  const [values, setValues, handleChange, handleSubmit] = useForm(onSubmit, {
    email: '',
    password1: '',
    password2: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    street_address: '',
    city: '',
    state: '',
    zipcode: '',

    errors: {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      street_address: '',
      city: '',
      state: '',
      zipcode: '',
    },
  });

  const renderError = (type, errors = values.errors) => {
    if (errors[type]) {
      return (
        <span className="signup-error help-block">
          <p style={ERROR_MSG}>{errors[type]}</p>
        </span>
      );
    }
  };

  return isLoggedIn ? (
    <Redirect to="/products" />
  ) : (
    <div style={{ margin: '2vw' }} className="container">
      <form>
        <div className="row">
          <div className="col-sm" style={SIGNUP_FORM_COL}>
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {renderError('email')}
            <label htmlFor="password1">Enter a password: </label>
            <input
              type="password"
              name="password1"
              value={values.password1}
              onChange={handleChange}
            />
            <label htmlFor="password2">Confirm password: </label>
            <input
              type="password"
              name="password2"
              value={values.password2}
              onChange={handleChange}
            />
            {renderError('password')}
            <label htmlFor="first_name">First name: </label>
            <input
              type="text"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
            />
            {renderError('first_name')}
            <label htmlFor="last_name">Last name: </label>
            <input
              type="text"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
            />
            {renderError('last_name')}
            <label htmlFor="phone_number">Phone Number: </label>
            <input
              type="text"
              name="phone_number"
              value={values.phone_number}
              onChange={handleChange}
            />
            {renderError('phone_number')}
          </div>
          <div className="col-sm" style={SIGNUP_FORM_COL}>
            <label htmlFor="street_address">Address: </label>
            <input
              type="text"
              name="street_address"
              value={values.street_address}
              onChange={handleChange}
            />

            {renderError('street_address')}

            <label htmlFor="city">City: </label>
            <input
              type="text"
              name="zipcode"
              value={values.zipcode}
              onChange={handleChange}
            />
            {renderError('city')}
            <label htmlFor="zipcode">Zipcode: </label>
            <input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
            />
            {renderError('zipcode')}
            <label htmlFor="state">State: </label>
            <select name="state" onChange={handleChange}>
              <option value="">--</option>
              {stateAbbrevs.map(state => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
            {renderError('state')}
          </div>
        </div>
        <div style={{ textAlign: 'center', margin: '2vh' }}>
          <button onClick={handleSubmit} className="btn btn-primary">
            Sign Up!
          </button>
        </div>
      </form>
    </div>
  );
};
const mapState = ({ isLoggedIn }) => ({ isLoggedIn });
const mapDispatch = dispatch => ({
  login: (email, pw) => dispatch(loginThunk(email, pw)),
});
export default connect(
  mapState,
  mapDispatch
)(Signup);
