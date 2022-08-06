import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import StoreContextProvider from './context/StoreContextProvider';
import reportWebVitals from './reportWebVitals';
import './styles/global.scss';
import App from './views/App';

ReactDOM.render(
  <StoreContextProvider>
    <App />
  </StoreContextProvider>
  , document.getElementById('root')
);

reportWebVitals();
