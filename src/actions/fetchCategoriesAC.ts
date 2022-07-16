import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { FetchCategoriesApiOptions } from 'api/categories';
import { FetchCategoriesHookOptions } from 'hooks/useFetchCategoriesApi';
import { GlobalState } from 'reducers';
import { FetchCategoriesApiCall } from 'reducers/fetchCategoriesApiCallReducer';
import { apiCallSelector } from 'reducers/state/fetchCategoriesApiCall';

import setAppLoadingAC, { SetAppLoadingAction } from './setAppLoadingAC';
import { API_CALL_FETCH_CATEGORIES } from './types';

export interface ApiCallFetchCategoriesAction extends Action<'API_CALL_FETCH_CATEGORIES'> {
  payload: FetchCategoriesApiCall;
}

interface FetchCategoriesACOptions extends FetchCategoriesApiOptions, FetchCategoriesHookOptions { }

type FetchCategoriesActionCreator = (options?: FetchCategoriesACOptions) => (
  dispatch: Dispatch<ApiCallFetchCategoriesAction | SetAppLoadingAction>,
  getState: () => Readonly<GlobalState>
) => Promise<void>;

const fetchCategoriesAC: FetchCategoriesActionCreator =
  (options = {}) => async (dispatch, getState) => {
    const onSuccess = options.onSuccess ?? noop;
    const onFailure = options.onFailure ?? noop;
    const onCompletion = options.onCompletion ?? noop;

    dispatch({
      type: API_CALL_FETCH_CATEGORIES,
      payload: { ...apiCallSelector(getState()), loading: true }
    });
    dispatch(setAppLoadingAC(true));

    try {
      const { data: apiResponse } = await api.fetchCategories({
        include_dishes: options.include_dishes,
        order_by: options.order_by,
        order_direction: options.order_direction
      });

      dispatch({
        type: API_CALL_FETCH_CATEGORIES,
        payload: {
          ...apiCallSelector(getState()),
          data: apiResponse.data,
          includedData: apiResponse.included,
          error: null
        }
      });
      onSuccess(apiResponse.data);
    } catch (error: unknown) {
      const safeError = error ?? {};

      dispatch({
        type: API_CALL_FETCH_CATEGORIES,
        payload: { ...apiCallSelector(getState()), error: safeError }
      });
      onFailure(safeError);
    } finally {
      dispatch({
        type: API_CALL_FETCH_CATEGORIES,
        payload: { ...apiCallSelector(getState()), loading: false }
      });
      dispatch(setAppLoadingAC(false));
      onCompletion();
    }
  };

export default fetchCategoriesAC;
