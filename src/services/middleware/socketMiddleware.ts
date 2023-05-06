import { Middleware } from "redux";
import { getCookie } from '../../utils/cookie';
import { TWsOrdersActions } from '../types/types';

export const spcketMiddleware = (wsUrl: string, wsActions: TWsOrdersActions): Middleware => {
    return store => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, 
                wsFailed, 
                onOpen, 
                onMessage, 
                onClose, 
                onError,
                wsDisconnect } = wsActions;

            const { profile } = getState().profileReducer;

            if (type === wsInit && profile) {
                socket = new WebSocket(`${wsUrl}?token=${getCookie('token')}`);
               };
            if (type === wsInit && !profile) {
                socket = new WebSocket(`${wsUrl}`);
            }

            if (type === wsDisconnect) {
                socket?.close(1000, "Switching off the user")
            }

            if (socket) {
                socket.onopen = event => {
                  dispatch({ type: onOpen, payload: event });
                };
                socket.onerror = event => {
                  dispatch({type: onError, payload: event});
                };
                socket.onmessage = (event) => {
                  const { data } = event;
                  const parsedData = JSON.parse(data);
                  const { success, ...restParsedData } = parsedData;
                  success && dispatch({ type: onMessage, payload: restParsedData });
                  if (restParsedData.message === 'Invalid or missing token') {
                    dispatch({ type: wsFailed });
                  }
                };
                socket.onclose = (event) => {
                  if (event.code !== 1000) {
                    dispatch({ type: onError });
                  }
                  dispatch({ type: onClose });
                };
              };
              next(action);
        }
    }
}