import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Header from './../../client/components/Header/Header';

xtest('it renders correctly', () => {
  const reducer = () => {
    return {};
  };
  const store = createStore(reducer);
  const component = renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
