import React from 'react';
import { connect } from 'react-redux';
import { ACCOUNT_PROFILE } from '../styles';

const AccountProfile = props => {
  const { isLoggedIn } = props;
  const { profile } = props.currentUser;

  if (!isLoggedIn) {
    return <h2>Please log in first.</h2>;
  } else {
    return (
      <div id="nav-link-account" style={ACCOUNT_PROFILE}>
        <div id="profile-image">
          <img src={profile.profile_pic_url} width="200px" />
        </div>
        <div id="profile-info" style={{ border: '2px navy dotted' }}>
          Name: {profile.first_name} {profile.last_name}
          <br />
          Phone Number: {profile.phone_number}
          <br />
          Address: <br />
          {profile.street_address} <br />
          {profile.city}, {profile.state} {profile.zipcode}
        </div>
      </div>
    );
  }
};
const mapState = ({ isLoggedIn, currentUser }) => ({ isLoggedIn, currentUser });

export default connect(mapState)(AccountProfile);
