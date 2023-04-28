import { GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED, 
    RESET_ORDER } from '../actions/orderActions';

import { TOrderActions } from '../actions/orderActions';

type TOrderState = {
  orderDetails: number | null;
  orderRequest: Boolean;
  orderFailed: Boolean;
}

const initialState: TOrderState = {
  orderDetails: null,
  orderRequest: false,
  orderFailed: false
};
  
  export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
      case GET_ORDER_REQUEST: {
        return {
          ...state,
          orderRequest: true,
          orderFailed: false
        }
      }
      case GET_ORDER_FAILED: {
        return {
          ...state,
          orderRequest: false,
          orderFailed: true
        }
      }
      case GET_ORDER_SUCCESS: {
        return {
          ...state,
          orderRequest: false,
          orderDetails: action.payload
        }
      }
      case RESET_ORDER: {
        return {
          ...state,
          orderDetails: null
        }
      }
      default: {
        return state;
      }
    }
  };