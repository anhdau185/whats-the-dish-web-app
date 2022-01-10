import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import { NullableDish, Category } from 'models';
import * as api from 'api';
import {
  GetDishApiOptions,
  SingleDishApiResponse
} from 'api/dishes';

import { ApiHookOptions } from '.';

interface GetDishApiHookOptions extends ApiHookOptions {
  onSuccess?: (data: SingleDishApiResponse) => void;
}

interface GetDishHookResult {
  data: NullableDish;
  includedData: Category[];
  error: any;
  loading: boolean;
  fetchData: (id: string, params?: GetDishApiOptions) => Promise<void>;
}

const useGetDishApi =
  (options?: GetDishApiHookOptions): GetDishHookResult => {
    const [response, setResponse] = useState<SingleDishApiResponse | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSuccess = options?.onSuccess || noop;
    const onFailure = options?.onFailure || noop;
    const onCompletion = options?.onCompletion || noop;

    const data = response?.data || null;
    const includedData = response?.included || [];

    const fetchData = useCallback(
      async (id: string, params?: GetDishApiOptions) => {
        setLoading(true);

        try {
          const { data: response } = await api.getDish(id, params);

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
      error,
      loading,
      fetchData
    };
  };

export default useGetDishApi;
