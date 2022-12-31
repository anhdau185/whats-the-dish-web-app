import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Category, Dish } from 'models';
import {
  GetDishApiOptions,
  SingleDishApiResponse
} from 'api/types';

import { ApiHookOptions, useAppLoading } from '.';

interface GetDishHookOptions extends ApiHookOptions {
  onSuccess?: (data: SingleDishApiResponse) => void;
}

interface GetDishHookResult {
  data: Nullable<Dish>;
  includedData: Category[];
  error: any;
  loading: boolean;
  fetchData: (id: string, params?: GetDishApiOptions) => Promise<void>;
}

const useGetDishApi =
  (options?: GetDishHookOptions): GetDishHookResult => {
    const [response, setResponse] = useState<SingleDishApiResponse | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setLoading: setAppLoading } = useAppLoading();

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const data = response?.data ?? null;
    const includedData = response?.included ?? [];

    const fetchData = useCallback(
      async (id: string, params?: GetDishApiOptions) => {
        setLoading(true);
        setAppLoading(true);

        try {
          const { data: apiResponse } = await api.getDish(id, params);

          setResponse(apiResponse);
          setError(null);
          onSuccess(apiResponse);
        } catch (exception: unknown) {
          const safeError = exception ?? {};

          setError(safeError);
          onFailure(safeError);
        } finally {
          setLoading(false);
          setAppLoading(false);
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
