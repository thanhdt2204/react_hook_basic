import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore, { persistor } from './redux';
import reportWebVitals from './reportWebVitals';
import './styles/global.scss';
import App from './views/App';

ReactDOM.render(
  <Provider store={reduxStore}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
