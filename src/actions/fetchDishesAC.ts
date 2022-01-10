import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { FetchDishesApiOptions } from 'api/dishes';
import { FetchDishesHookOptions } from 'hooks/useFetchDishesApi';
import { GlobalState } from 'reducers';
import { FetchDishesApiCall } from 'reducers/fetchDishesApiCallReducer';
import { apiCallSelector } from 'reducers/state/fetchDishesApiCall';

import { API_CALL_FETCH_DISHES } from './types';

export interface ApiCallFetchDishesAction extends Action<'API_CALL_FETCH_DISHES'> {
  payload: FetchDishesApiCall;
}

interface FetchDishesACOptions extends FetchDishesApiOptions, FetchDishesHookOptions { }

type FetchDishesActionCreator = (options?: FetchDishesACOptions) => (
  dispatch: Dispatch<ApiCallFetchDishesAction>,
  getState: () => Readonly<GlobalState>
) => Promise<void>;

const fetchDishesAC: FetchDishesActionCreator =
  (options = {}) => async (dispatch, getState) => {
    const onSuccess = options.onSuccess || noop;
    const onFailure = options.onFailure || noop;
    const onCompletion = options.onCompletion || noop;

    dispatch({
      type: API_CALL_FETCH_DISHES,
      payload: { ...apiCallSelector(getState()), loading: true }
    });

    try {
      const { data: apiResponse } = await api.fetchDishes({
        include_categories: options.include_categories,
        order_by: options.order_by,
        order_direction: options.order_direction
      });

      dispatch({
        type: API_CALL_FETCH_DISHES,
        payload: {
          ...apiCallSelector(getState()),
          data: apiResponse.data,
          includedData: apiResponse.included
        }
      });
      onSuccess(apiResponse.data);
    } catch (error: any) {
      const safeError = error ?? {};

      dispatch({
        type: API_CALL_FETCH_DISHES,
        payload: { ...apiCallSelector(getState()), error: safeError }
      });
      onFailure(safeError);
    } finally {
      dispatch({
        type: API_CALL_FETCH_DISHES,
        payload: { ...apiCallSelector(getState()), loading: false }
      });
      onCompletion();
    }
  };

export default fetchDishesAC;
