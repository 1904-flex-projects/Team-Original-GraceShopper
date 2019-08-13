import React from 'react';
import { connect } from 'react-redux';
import AccountTable from './AccountTable';

const AccountProfile = props => {
  const { isLoggedIn } = props;
  const { first_name, last_name, profile_pic_url } = props.currentUser.profile;
  const profileName = `${first_name} ${last_name}`;
  const profileImage = (
    <img
      className="card-img-top"
      src={profile_pic_url}
      style={{ width: '15rem' }}
    />
  );

  if (!isLoggedIn) {
    return <h2>Please log in first.</h2>;
  } else {
    return (
      <div className="container mt-3">
        <h3>Profile </h3>
        <div className="d-flex justify-content-center">
          <div className="row ">
            <div className="card p-3 text-dark bg-light">
              {profileImage}
              <div className="card-body">
                <h5 className="card-title">{profileName}</h5>
                <p className="card-text" />
                <AccountTable />
                <a
                  href="/account"
                  className="btn btn-primary text-center"
                  type="button"
                >
                  Update Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
const mapState = ({ isLoggedIn, currentUser }) => ({ isLoggedIn, currentUser });

export default connect(mapState)(AccountProfile);
