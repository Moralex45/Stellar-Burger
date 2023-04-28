import { getOrder }  from '../../utils/api';
import { updateToken } from './profileActions';
import { AppDispatch } from '../types/index';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const RESET_ORDER: 'DELETE_ORDER' = 'DELETE_ORDER'

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: number;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export type TOrderActions = 
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed
  | IResetOrder;

export const getOrderData = (ingredients: Array<string | undefined>) => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_ORDER_REQUEST
  });
  getOrder(ingredients)
    .then((res) => {
      if (res) {
        dispatch({ type: GET_ORDER_SUCCESS, payload: res.order.number })
      }
    })
    .catch(() => {
      dispatch({ type: GET_ORDER_FAILED });
      dispatch(updateToken());
    });
  };

export const deleteOrder = () => ({ type: RESET_ORDER });