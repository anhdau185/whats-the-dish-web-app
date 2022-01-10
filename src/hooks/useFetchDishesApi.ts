import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dish } from 'models';
import { FetchDishesApiOptions } from 'api/dishes';
import fetchDishesAC from 'actions/fetchDishesAC';
import { FetchDishesApiCall } from 'reducers/fetchDishesApiCallReducer';
import {
  dataSelector,
  errorSelector,
  includedDataSelector,
  loadingSelector
} from 'reducers/state/fetchDishesApiCall';

import { ApiHookOptions } from '.';

export interface FetchDishesHookOptions extends ApiHookOptions {
  onSuccess?: (data: Dish[]) => void;
}

interface FetchDishesHookResult extends FetchDishesApiCall {
  fetchData: (params?: FetchDishesApiOptions) => void;
}

const useFetchDishesApi =
  (options?: FetchDishesHookOptions): FetchDishesHookResult => {
    const dispatch = useDispatch();
    const data = useSelector(dataSelector);
    const includedData = useSelector(includedDataSelector);
    const error = useSelector(errorSelector);
    const loading = useSelector(loadingSelector);

    const fetchData = useCallback((params?: FetchDishesApiOptions) => {
      dispatch(fetchDishesAC({ ...options, ...params }));
    }, [options]);

    return {
      data,
      includedData,
      error,
      loading,
      fetchData
    };
  };

export default useFetchDishesApi;
