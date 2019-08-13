import SingleUser from './SingleUser';
import React from 'react';

import { USERS_CONTAINER } from './styles';
const AllUsers = props => {
  const { users } = props;
  return (
    <div style={USERS_CONTAINER}>
      {users.map(user => (
        <SingleUser key={user.id} user={user} />
      ))}
    </div>
  );
};

export default AllUsers;
