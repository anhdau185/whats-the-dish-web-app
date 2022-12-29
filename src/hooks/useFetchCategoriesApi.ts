import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategoriesAC } from 'appState/actions';
import { FetchCategoriesAction } from 'appState/actions/types';
import {
  dataSelector,
  includedDataSelector,
  errorSelector,
  loadingSelector
} from 'appState/selectors/fetchCategoriesApiCall';

type ApiParams = FetchCategoriesAction['payload']['params'];

type ApiHookOptions = Pick<
  FetchCategoriesAction['payload'],
  'onSuccess' | 'onFailure' | 'onCompletion'
>;

const useFetchCategoriesApi = (options?: ApiHookOptions) => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const includedData = useSelector(includedDataSelector);
  const error = useSelector(errorSelector);
  const loading = useSelector(loadingSelector);

  const fetchData = useCallback((params?: ApiParams) => {
    dispatch(fetchCategoriesAC({ params, ...options }));
  }, [options]);

  return {
    data,
    includedData,
    error,
    loading,
    fetchData
  };
};

export default useFetchCategoriesApi;
