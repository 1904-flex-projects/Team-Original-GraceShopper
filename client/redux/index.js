import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// const devOnlyLogger = process.end.NODE_ENV === 'development' ? logger : null;

// const middleware = [thunk, devOnlyLogger];

import rootReducer from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;

// export all creator functions from one place
export * from './actionCreators/currentUserCreators';
export * from './actionCreators/isLoggedInCreators';
export * from './actionCreators/productsCreators';
export * from './actionCreators/cartCreators';
