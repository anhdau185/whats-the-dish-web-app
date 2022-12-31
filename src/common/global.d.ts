/* eslint-disable @typescript-eslint/no-empty-interface */
import { AnyAction as ReduxAnyAction } from 'redux';
import { Action as BaseAction } from 'redux-actions';
import { Epic as BaseEpic } from 'redux-observable';
import { AppState } from 'appState/types';

declare global {
  type Nullable<T> = T | null;

  type OneOrMany<T> = T | Array<T>;

  interface AnyAction extends ReduxAnyAction {
    payload: any;
  }

  interface Action<T extends string = string, P = any> extends BaseAction<P> {
    type: T;
  }

  type ActionCreator<A extends Action> = (payload: A['payload']) => A;

  interface GlobalState extends AppState { }

  type Epic<TOutputAction> = BaseEpic<AnyAction, TOutputAction, GlobalState>;
}
