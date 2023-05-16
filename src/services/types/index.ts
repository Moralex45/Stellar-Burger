import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import { store } from '../store';
import { TIngredientsActions } from '../actions/ingredientsAction';
import { TOrderActions } from '../actions/orderActions';
import { TOrdersActions } from '../actions/ordersActions';
import { TPopupActions } from '../actions/popupActions';
import { TProfileActions } from '../actions/profileActions';

export type RootState = ReturnType<typeof store.getState>; 

export type TApplicationActions = 
  | TIngredientsActions
  | TOrderActions
  | TOrdersActions
  | TPopupActions
  | TProfileActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>; 

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
