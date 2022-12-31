import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCategoriesAC } from 'appState/actions';
import { FetchCategoriesAction } from 'appState/actions/types';
import {
  dataSelector,
  includedDataSelector,
  errorSelector,
  loadingSelector
} from 'appState/selectors/apiCalls/fetchCategories';

type ApiParams = FetchCategoriesAction['payload']['params'];

const useFetchCategoriesApi = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const includedData = useSelector(includedDataSelector);
  const error = useSelector(errorSelector);
  const loading = useSelector(loadingSelector);

  const fetchData = useCallback((params?: ApiParams) => {
    dispatch(fetchCategoriesAC({ params }));
  }, []);

  return {
    data,
    includedData,
    error,
    loading,
    fetchData
  };
};

export default useFetchCategoriesApi;
