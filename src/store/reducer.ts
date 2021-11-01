import { combineReducers } from 'redux';
import { homeReducer } from '../pages/home';

export const rootReducer = combineReducers({
  home: homeReducer,
});

export type RootReducer = typeof rootReducer;
