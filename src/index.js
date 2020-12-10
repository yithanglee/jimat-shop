import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SimpleReactLightbox from 'simple-react-lightbox';

import 'style/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <SimpleReactLightbox>
      <App />
    </SimpleReactLightbox>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
