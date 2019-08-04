import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './redux';
import AppRouter from './components/AppRouter';

class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default Main;
