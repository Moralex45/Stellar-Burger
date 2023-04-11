import { combineReducers } from 'redux';

import { ingredientReducer } from './ingredientsReducer.js';
import { orderReducer } from './orderReducer.js';
import { popupReducer } from './popupReducer.js';
import { profileReducer } from './profileReducer.js';

export const rootReducer = combineReducers({
  ingredientReducer,
  orderReducer,
  popupReducer,
  profileReducer
});