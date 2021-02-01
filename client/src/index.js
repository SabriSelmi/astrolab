import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from './redux/reducers';
import reduxThunk from 'redux-thunk';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";


import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
      <Provider store={createStore(reducers,applyMiddleware(reduxThunk))}>
        <BrowserRouter>
          <App></App>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
