/* eslint-disable @typescript-eslint/no-empty-interface */
import { AnyAction as ReduxAnyAction } from 'redux';
import { Action as BaseAction } from 'redux-actions';
import { Epic as BaseEpic } from 'redux-observable';
import { AppState } from 'appState/types';

declare global {
  interface AnyAction extends ReduxAnyAction { }

  interface Action<
    T extends string = string,
    P = any
  > extends BaseAction<P> {
    type: T;
  }

  type ActionCreator<A extends Action> = (payload: A['payload']) => A;

  interface GlobalState extends AppState { }

  type Epic<TOutputAction> = BaseEpic<AnyAction, TOutputAction, GlobalState>;
}
