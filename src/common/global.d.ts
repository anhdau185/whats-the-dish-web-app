import { Action as BaseAction } from 'redux-actions';
import { Epic as BaseEpic } from 'redux-observable';

declare global {
  interface Action<
    T extends string = string,
    P = any
  > extends BaseAction<P> {
    type: T;
  }

  type ActionCreator<A extends Action> = (payload: A['payload']) => A;

  type Epic<TOutputAction> = BaseEpic<AnyAction, TOutputAction, GlobalState>;
}
