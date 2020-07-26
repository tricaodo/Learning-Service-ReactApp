import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { ToastProvider } from "react-toast-notifications";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
const store = createStore(reducer, /* preloadedState, */ applyMiddleware(thunk));
ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

