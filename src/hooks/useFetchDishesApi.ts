import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDishesAC } from 'appState/actions';
import { FetchDishesAction } from 'appState/actions/types';
import {
  dataSelector,
  errorSelector,
  includedDataSelector,
  loadingSelector
} from 'appState/selectors/fetchDishesApiCall';

type ApiParams = FetchDishesAction['payload']['params'];

type ApiHookOptions = Pick<
  FetchDishesAction['payload'],
  'onSuccess' | 'onFailure' | 'onCompletion'
>;

const useFetchDishesApi = (options?: ApiHookOptions) => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const includedData = useSelector(includedDataSelector);
  const error = useSelector(errorSelector);
  const loading = useSelector(loadingSelector);

  const fetchData = useCallback((params?: ApiParams) => {
    dispatch(fetchDishesAC({ params, ...options }));
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
