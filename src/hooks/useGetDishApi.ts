import { useCallback, useState } from 'react';

import { NullableDish, Category } from 'models';
import * as api from 'api';
import {
  GetDishApiOptions,
  SingleDishApiResponse
} from 'api/dishes';

interface GetDishHookResult {
  data: NullableDish;
  includedData: Category[];
  fetchData: () => void;
  loading: boolean;
  error: any;
}

const useGetDishApi =
  (id: string, params?: GetDishApiOptions): GetDishHookResult => {
    const [response, setResponse] = useState<SingleDishApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const data = response?.data || null;
    const includedData = response?.included || [];

    const fetchData = useCallback(() => {
      setLoading(true);
      api.getDish(id, params)
        .then(({ data: apiResponse }) => setResponse(apiResponse))
        .catch(setError)
        .finally(() => setLoading(false));
    }, [id, params]);

    return {
      data,
      includedData,
      fetchData,
      loading,
      error
    };
  };

export default useGetDishApi;
