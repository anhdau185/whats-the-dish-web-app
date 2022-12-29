import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { timer } from 'rxjs';
import { mapTo, pluck, switchMap } from 'rxjs/operators';

export type PingAction = Action<'PING', number>;
export type PongAction = Action<'PONG'>;

/*
  - Action-to-Action mapping => simply use `map` operator
  - Action-to-Observable mapping: If emitted Actions of a source Observable are mapped to
  inner Observables, it is very likely that we will have to deal with inner Observable combination
  and we should choose between `concatMap`, `mergeMap`, `switchMap`, and `exhaustMap`.
  It is all about choosing a suitable Observable combination strategy.
  - See this link: https://blog.angular-university.io/rxjs-higher-order-mapping/
 */

const pingPongEpic: Epic<PongAction> = action$ =>
  action$.pipe(
    ofType<AnyAction, PingAction>('PING'),
    pluck('payload'),
    switchMap(delayTime => timer(delayTime).pipe(
      mapTo({ type: 'PONG' as const, payload: null })
    ))
  );

export default pingPongEpic;
