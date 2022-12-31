import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, exhaustMap, mergeMap, pluck } from 'rxjs/operators';

import * as api from 'api';
import { setAppLoadingAC, updateLocalDishesAC } from 'appState/actions';
import { FETCH_DISHES_API } from 'appState/actions/constants';
import {
  FetchDishesAction,
  SetAppLoadingAction,
  UpdateLocalDishesAction
} from 'appState/actions/types';

const fetchDishesEpic: Epic<SetAppLoadingAction | UpdateLocalDishesAction> = action$ =>
  action$.pipe(
    ofType<AnyAction, FetchDishesAction>(FETCH_DISHES_API),
    pluck('payload', 'params'),
    exhaustMap(params => concat(
      of(
        setAppLoadingAC(true),
        updateLocalDishesAC({ loading: true })
      ),
      from(api.fetchDishes(params)).pipe(
        pluck('data'),
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
        ))
      )
    ))
  );

export default fetchDishesEpic;
