import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Category } from 'models';
import { FetchCategoriesApiOptions } from 'api/categories';
import fetchCategoriesAC from 'actions/fetchCategoriesAC';
import { FetchCategoriesApiCall } from 'reducers/fetchCategoriesApiCallReducer';
import {
  dataSelector,
  includedDataSelector,
  errorSelector,
  loadingSelector
} from 'reducers/state/fetchCategoriesApiCall';

import { ApiHookOptions } from '.';

export interface FetchCategoriesHookOptions extends ApiHookOptions {
  onSuccess?: (data: Category[]) => void;
  onFailure?: (error: any) => void;
  onCompletion?: () => void;
}

interface FetchCategoriesHookResult extends FetchCategoriesApiCall {
  fetchData: (params?: FetchCategoriesApiOptions) => void;
}

const useFetchCategoriesApi =
  (options?: FetchCategoriesHookOptions): FetchCategoriesHookResult => {
    const dispatch = useDispatch();
    const data = useSelector(dataSelector);
    const includedData = useSelector(includedDataSelector);
    const error = useSelector(errorSelector);
    const loading = useSelector(loadingSelector);

    const fetchData = useCallback((params?: FetchCategoriesApiOptions) => {
      dispatch(fetchCategoriesAC({ ...options, ...params }));
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
