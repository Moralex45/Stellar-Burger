import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';

import { socketMiddleware } from './middleware/socketMiddleware';
import { ALL_ORDERS_URL, USER_ORDERS_URL } from '../utils/constants';
import { WS_All_ORDERS_CONNECTION_START,
  WS_All_ORDERS_CONNECTION_SUCCESS,
  WS_All_ORDERS_CONNECTION_FAILED,
  WS_ALL_ORDERS_GET_MESSAGE,
  WS_ALL_ORDERS_CONNECTION_ERROR,
  WS_ALL_ORDERS_CONNECTION_CLOSED,
  WS_ALL_ORDERS_CONNECTION_DISCONNECT,
  WS_USER_ORDERS_CONNECTION_START,
  WS_USER_ORDERS_CONNECTION_SUCCESS,
  WS_USER_ORDERS_CONNECTION_FAILED,
  WS_USER_ORDERS_GET_MESSAGE,
  WS_USER_ORDERS_CONNECTION_ERROR,
  WS_USER_ORDERS_CONNECTION_CLOSED,
  WS_USER_ORDERS_CONNECTION_DISCONNECT } from './actions/ordersActions';

const wsAllOrdersActions = {
  wsInit: WS_All_ORDERS_CONNECTION_START,
  wsFailed: WS_All_ORDERS_CONNECTION_FAILED,
  onOpen: WS_All_ORDERS_CONNECTION_SUCCESS,
  onMessage: WS_ALL_ORDERS_GET_MESSAGE,
  onClose: WS_ALL_ORDERS_CONNECTION_CLOSED,
  onError: WS_ALL_ORDERS_CONNECTION_ERROR,
  wsDisconnect: WS_ALL_ORDERS_CONNECTION_DISCONNECT
};
  
const wsUserOrdersActions = {
  wsInit: WS_USER_ORDERS_CONNECTION_START,
  wsFailed: WS_USER_ORDERS_CONNECTION_FAILED,
  onOpen: WS_USER_ORDERS_CONNECTION_SUCCESS,
  onMessage: WS_USER_ORDERS_GET_MESSAGE,
  onClose: WS_USER_ORDERS_CONNECTION_CLOSED,
  onError: WS_USER_ORDERS_CONNECTION_ERROR,
  wsDisconnect: WS_USER_ORDERS_CONNECTION_DISCONNECT
};

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  };

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(ALL_ORDERS_URL, wsAllOrdersActions), socketMiddleware(USER_ORDERS_URL, wsUserOrdersActions))
);

export const store = createStore(rootReducer, enhancer);