import { 
    WS_All_ORDERS_CONNECTION_SUCCESS,
    WS_All_ORDERS_CONNECTION_FAILED,
    WS_ALL_ORDERS_GET_MESSAGE,
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_ALL_ORDERS_RESET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_FAILED,
    WS_USER_ORDERS_GET_MESSAGE,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_USER_ORDERS_RESET_MESSAGE 
} from '../actions/ordersActions';

import { ordersReducer, initialState } from './ordersReducer'

describe('Orders - редьюсер и экшены', () => {
    const testWsMessage = {
        orders: [
          {
            _id: '63ec88e7936b17001be5df11',
            ingredients: [
              '60d3b41abdacab0026a733c7',
              '60d3b41abdacab0026a733c9',
              '60d3b41abdacab0026a733c9',
              '60d3b41abdacab0026a733d1',
              '60d3b41abdacab0026a733c7'
            ],
            status: 'done',
            name: 'Бессмертный фалленианский флюоресцентный бургер',
            createdAt: '2023-02-15T07:25:27.868Z',
            updatedAt: '2023-02-15T07:25:28.269Z',
            number: 40846
          },
          {
            _id: '63ec7f31936b17001be5defc',
            ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6'],
            status: 'done',
            name: 'Краторный бургер',
            createdAt: '2023-02-15T06:44:01.872Z',
            updatedAt: '2023-02-15T06:44:02.362Z',
            number: 40845
          },
          {
            _id: '63ec7ed7936b17001be5defa',
            ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6'],
            status: 'done',
            name: 'Краторный бургер',
            createdAt: '2023-02-15T06:42:31.280Z',
            updatedAt: '2023-02-15T06:42:31.647Z',
            number: 40844
          },
          {
            _id: '63ec7e7c936b17001be5def6',
            ingredients: [
              '60d3b41abdacab0026a733c7',
              '60d3b41abdacab0026a733c9',
              '60d3b41abdacab0026a733c7'
            ],
            status: 'done',
            name: 'Бессмертный флюоресцентный бургер',
            createdAt: '2023-02-15T06:41:00.579Z',
            updatedAt: '2023-02-15T06:41:00.997Z',
            number: 40843
          },
          {
            _id: '63ec7e57936b17001be5def1',
            ingredients: [
                '60d3b41abdacab0026a733c6', 
                '60d3b41abdacab0026a733c6'
            ],
            status: 'done',
            name: 'Краторный бургер',
            createdAt: '2023-02-15T06:40:23.936Z',
            updatedAt: '2023-02-15T06:40:24.347Z',
            number: 40842
          }
        ],
        total: 40755,
        totalToday: 106
      };
    
    test('initial state', () => {
        expect(ordersReducer(undefined, {} as any)).toEqual(initialState);
    });

    test('should handle CHANGE_INGREDIENT_POPUP_STATE', () => {
        expect(ordersReducer(initialState, { type: WS_All_ORDERS_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            wsAllOrdersConnectSuccess: true
        });
    });

    test('should handle WS_All_ORDERS_CONNECTION_FAILED', () => {
        expect(ordersReducer(initialState, { type: WS_All_ORDERS_CONNECTION_FAILED })).toEqual({
            ...initialState,
            wsAllOrdersConnectFailed: true
        });
    });

    test('should handle WS_ALL_ORDERS_GET_MESSAGE', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_ALL_ORDERS_GET_MESSAGE,
            payload: testWsMessage
        })).toEqual({
            ...initialState,
            allOrders: testWsMessage.orders,
            total: testWsMessage.total,
            totalToday: testWsMessage.totalToday
        });
    });

    test('should handle WS_ALL_ORDERS_CONNECTION_ERROR', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_ALL_ORDERS_CONNECTION_ERROR,
        })).toEqual({
            ...initialState,
            wsAllOrdersConnectSuccess: false,
        });
    });

    test('should handle WS_ALL_ORDERS_CONNECTION_CLOSED', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_ALL_ORDERS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            wsAllOrdersConnectSuccess: false,
            allOrders: []
        });
    });

    test('should handle WS_ALL_ORDERS_RESET_MESSAGE', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_ALL_ORDERS_RESET_MESSAGE,
        })).toEqual({
            ...initialState,
            allOrders: []
        });
    });

    test('should handle WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_USER_ORDERS_CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState,
            wsUserOrdersConnectSuccess: true
        });
    });

    test('should handle WS_USER_ORDERS_CONNECTION_FAILED', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_USER_ORDERS_CONNECTION_FAILED,
        })).toEqual({
            ...initialState,
            wsUserOrdersConnectFailed: true
        });
    });

    test('should handle WS_USER_ORDERS_GET_MESSAGE', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_USER_ORDERS_GET_MESSAGE,
            payload: testWsMessage
        })).toEqual({
            ...initialState,
            userOrders: testWsMessage.orders
        });
    });

    test('should handle WS_USER_ORDERS_CONNECTION_ERROR', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_USER_ORDERS_CONNECTION_ERROR,
        })).toEqual({
            ...initialState,
            wsUserOrdersConnectSuccess: false
        });
    });

    test('should handle WS_USER_ORDERS_CONNECTION_CLOSED', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_USER_ORDERS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            wsUserOrdersConnectSuccess: false,
            userOrders: []
        });
    });

    test('should handle WS_USER_ORDERS_RESET_MESSAGE', () => {
        expect(ordersReducer(   
        undefined,  
        { 
            type: WS_USER_ORDERS_RESET_MESSAGE,
        })).toEqual({
            ...initialState,
            userOrders: []
        });
    });

});