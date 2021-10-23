import { useEffect, useState } from 'react';

import * as api from 'api';
import { NullableCategory } from 'models';

interface ApiHookResult<T> {
  data: T;
  loading: boolean;
  error: any;
}

export const useGetCategoryApi =
  (id: string, params?: api.GetCategoryApiOptions): ApiHookResult<NullableCategory> => {
    const [data, setData] = useState<NullableCategory>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
      setLoading(true);
      api.getCategory(id, params)
        .then(({ data: apiResponse }) => setData(apiResponse.data))
        .catch(setError)
        .finally(() => setLoading(false));
    }, []);

    return {
      data,
      loading,
      error
    };
  };
