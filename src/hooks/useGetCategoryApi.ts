import { useCallback, useState } from 'react';

import { NullableCategory, Dish } from 'models';
import * as api from 'api';
import {
  GetCategoryApiOptions,
  SingleCategoryApiResponse
} from 'api/categories';

interface GetCategoryHookResult {
  data: NullableCategory;
  includedData: Dish[];
  fetchData: () => void;
  loading: boolean;
  error: any;
}

const useGetCategoryApi =
  (id: string, params?: GetCategoryApiOptions): GetCategoryHookResult => {
    const [response, setResponse] = useState<SingleCategoryApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const data = response?.data || null;
    const includedData = response?.included || [];

    const fetchData = useCallback(() => {
      setLoading(true);
      api.getCategory(id, params)
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

export default useGetCategoryApi;
