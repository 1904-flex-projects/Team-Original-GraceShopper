import { GOT_USER, LOGOUT_USER } from './../';

const initialState = {
  email: '',
  profile: {
    id: '',
    first_name: '',
    last_name: '',
    profile_pic_url: '',
    street_address: '',
    city: '',
    state: '',
    zipcode: '',
    phone_number: '',
  },
  isAdmin: false,
  error: '',
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state, ...action.user };
    case LOGOUT_USER:
      return { ...initialState, profile: { ...initialState.profile } };
    default:
      return state;
  }
};

export default currentUserReducer;
