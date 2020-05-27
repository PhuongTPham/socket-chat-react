import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './configure-store';
import Root from './Root';

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById('root'),
  )
}

render();
