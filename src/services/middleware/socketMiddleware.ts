import { Middleware } from "redux";
import { getCookie } from '../../utils/cookie';
import { useSelector } from '../../services/types/hooks';
import { TWsOrdersActions } from '../types/types';

export const socketMiddleware = (wsUrl: string, wsActions: TWsOrdersActions, withToken = false): Middleware => {

    return store => {
        const accessToken = getCookie('token');
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
                } = wsActions;
            
              if (type === wsInit && withToken) {
                  socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
                };
              if (type === wsInit && !withToken) {
                  socket = new WebSocket(`${wsUrl}`);
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