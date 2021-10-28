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
  fetchData: (id: string, params?: GetCategoryApiOptions) => void;
  loading: boolean;
  error: any;
}

const useGetCategoryApi = (): GetCategoryHookResult => {
  const [response, setResponse] = useState<SingleCategoryApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const data = response?.data || null;
  const includedData = response?.included || [];

  const fetchData = useCallback((id: string, params?: GetCategoryApiOptions) => {
    setLoading(true);
    api.getCategory(id, params)
      .then(({ data: apiResponse }) => setResponse(apiResponse))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    includedData,
    fetchData,
    loading,
    error
  };
};

export default useGetCategoryApi;
