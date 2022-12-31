import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchDishesAC } from 'appState/actions';
import { FetchDishesAction } from 'appState/actions/types';
import {
  dataSelector,
  errorSelector,
  includedDataSelector,
  loadingSelector
} from 'appState/selectors/apiCalls/fetchDishes';

type ApiParams = FetchDishesAction['payload']['params'];

const useFetchDishesApi = () => {
  const dispatch = useDispatch();
  const data = useSelector(dataSelector);
  const includedData = useSelector(includedDataSelector);
  const error = useSelector(errorSelector);
  const loading = useSelector(loadingSelector);

  const fetchData = useCallback((params?: ApiParams) => {
    dispatch(fetchDishesAC({ params }));
  }, []);

  return {
    data,
    includedData,
    error,
    loading,
    fetchData
  };
};

export default useFetchDishesApi;
