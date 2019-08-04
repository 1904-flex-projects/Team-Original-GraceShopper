import React from 'react';
import useForm from './../../hooks/useForm';
import { connect } from 'react-redux';
import { loginThunk } from './../../redux';
import { Redirect } from 'react-router-dom';

const Login = props => {
  const { history, error, isLoggedIn, login } = props;

  const initialState = { email: '', password: '' };
  const onSubmit = values => {
    login(values.email, values.password);
  };

  const [values, setValues, handleChange, handleSubmit] = useForm(
    onSubmit,
    initialState
  );

  const renderError = message => {
    return (
      <div>
        <p style={{ color: 'red' }}>{message}</p>
      </div>
    );
  };

  return isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {error ? renderError(error) : ''}
        <button type="submit" disabled={!values.password || !values.email}>
          Login
        </button>
      </form>
    </div>
  );
};

// after validating send dispatch to redux store
const mapState = state => ({
  error: state.currentUser.error,
  isLoggedIn: state.isLoggedIn,
});
const mapDispatch = dispatch => ({
  login: (email, password) => {
    dispatch(loginThunk(email, password));
  },
});
export default connect(
  mapState,
  mapDispatch
)(Login);
