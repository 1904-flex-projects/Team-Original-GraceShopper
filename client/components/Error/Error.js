import React from 'react';

const Error = props => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src="/images/404.jpg" alt="404 page not found" />
    </div>
  );
};

export default Error;
