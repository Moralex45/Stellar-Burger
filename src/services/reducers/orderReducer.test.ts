import { 
    GET_ORDER_REQUEST, 
    GET_ORDER_SUCCESS, 
    GET_ORDER_FAILED, 
    RESET_ORDER 
} from '../actions/orderActions';

import { orderReducer, initialState } from './orderReducer'

describe('Order - редьюсер и экшены', () => {
    
    test('initial state', () => {
        expect(orderReducer(undefined, {} as any)).toEqual(initialState);
    });

    test('should handle GET_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, { type: GET_ORDER_REQUEST })).toEqual({
        ...initialState,
        orderRequest: true,
        orderFailed: false
        });
    });

    test('should handle GET_ORDER_FAILED', () => {
        expect(orderReducer(initialState, { type: GET_ORDER_FAILED })).toEqual({
        ...initialState,
        orderRequest: false,
        orderFailed: true
        });
    });
    
    test('should handle RESET_ORDER', () => {
        expect(orderReducer(
            {
                ...initialState,
                orderDetails: 100
            }, 
            { 
                type: RESET_ORDER 
            }
        )).toEqual({
            ...initialState,
            orderDetails: null
        });
    });

    test('should handle GET_ORDER_SUCCESS', () => {
        expect(orderReducer(initialState, {
            type: GET_ORDER_SUCCESS,
            payload: 32861
        })).toEqual({
            ...initialState,
            orderDetails: 32861
        });
    });
});