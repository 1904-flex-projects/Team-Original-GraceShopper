import React, { useState, useEffect } from 'react';
import useForm from './../../hooks/useForm';
import axios from 'axios';

import { SINGLE_USER_CONTAINER } from './styles';
const SingleUser = props => {
  const { user } = props;
  const onSubmit = values => {
    console.log(values);
  };

  const [values, setValues, handleChange, handleSubmit] = useForm(onSubmit, {
    id: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    setValues({
      id: user.id,
      email: user.email,
      first_name: user.profile.first_name,
      last_name: user.profile.last_name,
    });
  }, [user]);

  const [editMode, setEditMode] = useState(false);

  const renderStaticorInput = key => {
    if (editMode) {
      return (
        <input
          type="text"
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
          <strong>Email:</strong>{' '}
        </p>
        <p>{values.email}</p>
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>
          <strong>First Name: </strong>
        </p>
        {renderStaticorInput('first_name')}
      </div>
      <div style={{ display: 'inline-flex' }}>
        <p>
          <strong>Last Name: </strong>
        </p>
        {renderStaticorInput('last_name')}
      </div>
      {editMode ? (
        <div style={{ display: 'inline-flex' }}>
          <p>
            <strong>Change Password:</strong>{' '}
          </p>
          {renderStaticorInput('password')}
        </div>
      ) : (
        ''
      )}
      {renderButton()}
    </div>
  );
};

export default SingleUser;
