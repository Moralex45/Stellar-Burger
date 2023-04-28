import { combineReducers } from 'redux';

import { ingredientReducer } from './ingredientsReducer';
import { orderReducer } from './orderReducer';
import { popupReducer } from './popupReducer';
import { profileReducer } from './profileReducer';

export const rootReducer = combineReducers({
  ingredientReducer,
  orderReducer,
  popupReducer,
  profileReducer
});