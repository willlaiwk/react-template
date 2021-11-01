import { AnyAction } from 'redux';

interface HomeState {
  isLoading: boolean;
}

export const homeReducer = (state: HomeState = {} as HomeState, action: AnyAction): HomeState => {
  switch (action.type) {
    default:
      return state;
  }
};
