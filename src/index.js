import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-notifications/lib/notifications.css";
import App from './App';
import reducers from './reducers';
import { applyMiddleware, createStore,compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { NotificationContainer } from 'react-notifications'

// const store =createStore(reducers,applyMiddleware(thunk))
const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
ReactDOM.render(
  <Provider store={store}>
    <App />
    <NotificationContainer />
  </Provider>,
  document.getElementById('root')
);
