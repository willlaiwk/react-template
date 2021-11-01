import {
  createStore,
  applyMiddleware,
  Middleware,
  compose,
  $CombinedState,
  PreloadedState,
  AnyAction,
  Store,
} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, RootReducer } from './reducer';

const __DEV__ = process.env.NODE_ENV === 'development';

/** App root state type */
export type AppState = Omit<RootReducer, typeof $CombinedState>;

export type AppStore = Store<AppState, AnyAction>;

/**
 * Create App store
 */
export const configureStore = (preloadedState?: PreloadedState<AppState>): AppStore => {
  const middlewares: Middleware[] = [thunk];

  const composeEnhancers =
    __DEV__ && typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  const store = createStore(rootReducer, preloadedState || {}, composeEnhancers(applyMiddleware(...middlewares)));

  return store;
};
