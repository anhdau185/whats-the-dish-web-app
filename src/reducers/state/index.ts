import { GlobalState } from 'reducers';

export const appLoadingSelector =
  (state: Readonly<GlobalState>): boolean => state.appLoading;
