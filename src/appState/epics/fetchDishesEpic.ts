import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, exhaustMap, finalize, mergeMap, pluck, tap } from 'rxjs/operators';

import * as api from 'api';

import { setAppLoadingAC, updateLocalDishesAC } from '../actions';
import { FETCH_DISHES_API } from '../actions/constants';
import { FetchDishesAction } from '../actions/types';

const fetchDishesEpic: Epic<
  ReturnType<typeof setAppLoadingAC> | ReturnType<typeof updateLocalDishesAC>
> = action$ => action$.pipe(
  ofType<AnyAction, FetchDishesAction>(FETCH_DISHES_API),
  pluck('payload'),
  exhaustMap(payload => concat(
    of(
      setAppLoadingAC(true),
      updateLocalDishesAC({ loading: true })
    ),
    from(api.fetchDishes(payload.params)).pipe(
      pluck('data'),
      tap(
        res => payload.onSuccess?.(res.data),
        err => payload.onFailure?.(err ?? {})
      ),
      mergeMap(res => of(
        updateLocalDishesAC({
          loading: false,
          data: res.data,
          includedData: res.included,
          error: null
        }),
        setAppLoadingAC(false)
      )),
      catchError(err => of(
        updateLocalDishesAC({
          loading: false,
          error: err ?? {}
        }),
        setAppLoadingAC(false)
      )),
      finalize(() => payload.onCompletion?.())
    )
  ))
);

export default fetchDishesEpic;
