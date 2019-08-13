import React, { useState, useEffect } from 'react';
import useForm from './../../hooks/useForm';
import axios from 'axios';

import { SINGLE_USER_CONTAINER } from './styles';
const SingleUser = props => {
  const { user } = props;

  const onSubmit = (values, setValues) => {
    const updateObj = {
      id: values.id,
      profile: { first_name: values.first_name, last_name: values.last_name },
    };
    if (values.password) {
      updateObj.password = values.password;
    }
    axios
      .put(`/api/users/${values.id}`, updateObj)
      .then(res => {
        const response = res.data;
        // clear password in state
        setValues(vals => ({ ...vals, password: '' }));
      })
      .catch(e => {
        console.error('Error updating user', e);
      });
  };

  const [values, setValues, handleChange, handleSubmit] = useForm(onSubmit, {
    id: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    setValues(vals => ({
      ...vals,
      id: user.id,
      email: user.email,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name,
      password: '',
    }));
  }, [user]);

  const [editMode, setEditMode] = useState(false);

  const renderStaticOrInput = (key, type = 'text') => {
    if (editMode) {
      return (
        <input
          type={type}
          value={values[key]}
          name={key}
          onChange={handleChange}
        />
      );
    } else {
      return <p>{values[key]}</p>;
    }
  };

  const renderButton = () => {
    if (editMode) {
      return (
        <button
          onClick={() => {
            handleSubmit();
            setEditMode(false);
          }}
          className="btn btn-danger"
        >
          Update
        </button>
      );
    }
    return (
      <button
        onClick={() => {
          setEditMode(true);
        }}
        className="btn btn-primary"
      >
        Edit
      </button>
    );
  };

  return (
    <div style={SINGLE_USER_CONTAINER}>
      <div style={{ display: 'inline-flex' }}>
        <p>
          <strong>User ID:</strong>
        </p>
        <p>{values.id}</p>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>
          <strong>Email:</strong>
        </p>
        <p>{values.email}</p>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>
          <strong>First Name: </strong>
        </p>
        {renderStaticOrInput('first_name')}
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>
          <strong>Last Name: </strong>
        </p>
        {renderStaticOrInput('last_name')}
      </div>
      {editMode ? (
        <div style={{ display: 'inline-flex' }}>
          <p>
            <strong>Change Password:</strong>{' '}
          </p>
          {renderStaticOrInput('password', 'password')}
        </div>
      ) : (
        ''
      )}
      {renderButton()}
    </div>
  );
};

export default SingleUser;
