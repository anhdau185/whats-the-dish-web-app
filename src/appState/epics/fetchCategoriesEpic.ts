import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, exhaustMap, finalize, mergeMap, pluck, tap } from 'rxjs/operators';

import * as api from 'api';

import { setAppLoadingAC, updateLocalCategoriesAC } from '../actions';
import { FETCH_CATEGORIES_API } from '../actions/constants';
import { FetchCategoriesAction } from '../actions/types';

const fetchCategoriesEpic: Epic<
  ReturnType<typeof setAppLoadingAC> | ReturnType<typeof updateLocalCategoriesAC>
> = action$ => action$.pipe(
  ofType<AnyAction, FetchCategoriesAction>(FETCH_CATEGORIES_API),
  pluck('payload'),
  exhaustMap(payload => concat(
    of(
      setAppLoadingAC(true),
      updateLocalCategoriesAC({ loading: true })
    ),
    from(api.fetchCategories(payload.params)).pipe(
      pluck('data'),
      tap(
        res => payload.onSuccess?.(res.data),
        err => payload.onFailure?.(err ?? {})
      ),
      mergeMap(res => of(
        updateLocalCategoriesAC({
          loading: false,
          data: res.data,
          includedData: res.included,
          error: null
        }),
        setAppLoadingAC(false)
      )),
      catchError(err => of(
        updateLocalCategoriesAC({
          loading: false,
          error: err ?? {}
        }),
        setAppLoadingAC(false)
      )),
      finalize(() => payload.onCompletion?.())
    )
  ))
);

export default fetchCategoriesEpic;
