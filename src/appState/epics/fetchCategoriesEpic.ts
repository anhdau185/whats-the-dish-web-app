import { ofType } from 'redux-observable';
import { concat, from, of } from 'rxjs';
import { catchError, exhaustMap, mergeMap, pluck } from 'rxjs/operators';

import * as api from 'api';
import { setAppLoadingAC, updateLocalCategoriesAC } from 'appState/actions';
import { FETCH_CATEGORIES_API } from 'appState/actions/constants';
import {
  FetchCategoriesAction,
  SetAppLoadingAction,
  UpdateLocalCategoriesAction
} from 'appState/actions/types';

const fetchCategoriesEpic: Epic<SetAppLoadingAction | UpdateLocalCategoriesAction> = action$ =>
  action$.pipe(
    ofType<AnyAction, FetchCategoriesAction>(FETCH_CATEGORIES_API),
    pluck('payload', 'params'),
    exhaustMap(params => concat(
      of(
        setAppLoadingAC(true),
        updateLocalCategoriesAC({ loading: true })
      ),
      from(api.fetchCategories(params)).pipe(
        pluck('data'),
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
        ))
      )
    ))
  );

export default fetchCategoriesEpic;
