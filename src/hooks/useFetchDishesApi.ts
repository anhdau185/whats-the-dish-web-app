import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import { Dish, Category } from 'models';
import * as api from 'api';
import {
  FetchDishesApiOptions,
  DishCollectionApiResponse
} from 'api/dishes';

import { ApiHookOptions } from '.';

interface FetchDishesApiHookOptions extends ApiHookOptions {
  onSuccess?: (data: DishCollectionApiResponse) => void;
}

interface FetchDishesHookResult {
  data: Dish[];
  includedData: Category[];
  fetchData: (params?: FetchDishesApiOptions) => Promise<void>;
  loading: boolean;
  error: any;
}

const useFetchDishesApi =
  (options?: FetchDishesApiHookOptions): FetchDishesHookResult => {
    const [response, setResponse] = useState<DishCollectionApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const onSuccess = options?.onSuccess || noop;
    const onFailure = options?.onFailure || noop;
    const onCompletion = options?.onCompletion || noop;

    const data = response?.data || [];
    const includedData = response?.included || [];

    const fetchData = useCallback(
      async (params?: FetchDishesApiOptions) => {
        setLoading(true);
        try {
          const { data: response } = await api.fetchDishes(params);
          setResponse(response);
          onSuccess(response);
        } catch (error: any) {
          const safeError = error || {};
          setError(safeError);
          onFailure(safeError);
        } finally {
          setLoading(false);
          onCompletion();
        }
      },
      []
    );

    return {
      data,
      includedData,
      fetchData,
      loading,
      error
    };
  };

export default useFetchDishesApi;
