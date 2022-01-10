import { GlobalState } from 'reducers';
import { NullableDish } from 'models';

export const currentDishSelector =
  (state: Readonly<GlobalState>): NullableDish => state.currentDish;

export const appLoadingSelector =
  (state: Readonly<GlobalState>): boolean => state.appLoading;
