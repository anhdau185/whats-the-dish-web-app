import { useCallback, useState } from 'react';

import { Dish, Category } from 'models';
import * as api from 'api';
import {
  FetchDishesApiOptions,
  DishCollectionApiResponse
} from 'api/dishes';

interface FetchDishesHookResult {
  data: Dish[];
  includedData: Category[];
  fetchData: () => void;
  loading: boolean;
  error: any;
}

const useFetchDishesApi =
  (params?: FetchDishesApiOptions): FetchDishesHookResult => {
    const [response, setResponse] = useState<DishCollectionApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const data = response?.data || [];
    const includedData = response?.included || [];

    const fetchData = useCallback(() => {
      setLoading(true);
      api.fetchDishes(params)
        .then(({ data: apiResponse }) => setResponse(apiResponse))
        .catch(setError)
        .finally(() => setLoading(false));
    }, [params]);

    return {
      data,
      includedData,
      fetchData,
      loading,
      error
    };
  };

export default useFetchDishesApi;
