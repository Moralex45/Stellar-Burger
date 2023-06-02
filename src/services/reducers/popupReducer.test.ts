import { 
    CHANGE_INGREDIENT_POPUP_STATE, 
    CHANGE_ORDER_POPUP_STATE,
    CHANGE_ORDER_DETAILS_POPUP_STATE, 
    TPopupActions 
} from '../actions/popupActions';

import { popupReducer, initialState } from './popupReducer'

describe('Popup - редьюсер и экшены', () => {
    
    test('initial state', () => {
        expect(popupReducer(undefined, {} as any)).toEqual(initialState);
    });

    test('should handle CHANGE_INGREDIENT_POPUP_STATE', () => {
        expect(popupReducer(initialState, { type: CHANGE_INGREDIENT_POPUP_STATE, payload: true })).toEqual({
        ...initialState,
        isIngredientPopupOpen: true
        });
    });

    test('should handle CHANGE_ORDER_POPUP_STATE', () => {
        expect(popupReducer(initialState, { type: CHANGE_ORDER_POPUP_STATE, payload: true })).toEqual({
        ...initialState,
        isOrderPopupOpen: true
        });
    });

    test('should handle CHANGE_ORDER_DETAILS_POPUP_STATE', () => {
        expect(popupReducer(initialState, { type: CHANGE_ORDER_DETAILS_POPUP_STATE, payload: true })).toEqual({
        ...initialState,
        isOrderDetailsPopupOpen: true
        });
    });
});