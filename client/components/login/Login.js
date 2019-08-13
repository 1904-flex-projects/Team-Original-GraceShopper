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
      <h2>Sign In</h2>
      <div className="form-group row" />
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="form-control"
              id="inputEmail3"
              placeholder="Email"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password:
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="form-control"
              id="inputPassword3"
              placeholder="Password"
            />
            {error ? renderError(error) : ''}
          </div>
        </div>
        <div className="form-group row" />
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!values.password || !values.email}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// after validating send dispatch to redux store
const mapState = state => ({
  error: state.currentUser.error,
  isLoggedIn: state.isLoggedIn,
});

// todo:
// add current cart(non-logged in) to cart db and call the getCart thunk.
const mapDispatch = dispatch => ({
  login: (email, password) => {
    dispatch(loginThunk(email, password));
  },
});
export default connect(
  mapState,
  mapDispatch
)(Login);
