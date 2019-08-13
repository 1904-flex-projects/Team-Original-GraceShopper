import React from 'react';
import { connect } from 'react-redux';
import faker from 'faker';

const ConfirmationPage = props => {
  console.log(props);

  const confirmationCode = `
      ${faker.hacker
        .noun()
        .slice(0, 3)
        .toUpperCase()}-${faker.random.number({
    min: 100000,
    max: 999999,
  })}`;

  return (
    <div>
      <div className="alert alert-success" role="alert">
        Nice! Your order has been submitted and is currently being processed.
        <p />
        Your confirmation code is {confirmationCode}.
        <p />
        Click <a href="/">here</a> to go back to the home page.
      </div>
    </div>
  );
};

const mapState = ({ currentUser }) => ({ currentUser });

export default connect(mapState)(ConfirmationPage);
