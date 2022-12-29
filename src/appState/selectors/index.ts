import { GlobalState } from '../reducers';

export const appLoadingSelector =
  (state: Readonly<GlobalState>): boolean => state.appLoading;

export const pingingSelector =
  (state: Readonly<GlobalState>): boolean => state.pinging;
