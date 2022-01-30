import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import { Nullable } from 'utils';
import { Category, Dish } from 'models';
import * as api from 'api';
import {
  GetCategoryApiOptions,
  SingleCategoryApiResponse
} from 'api/categories';

import { ApiHookOptions, useAppLoading } from '.';

interface GetCategoryHookOptions extends ApiHookOptions {
  onSuccess?: (data: SingleCategoryApiResponse) => void;
}

interface GetCategoryHookResult {
  data: Nullable<Category>;
  includedData: Dish[];
  error: any;
  loading: boolean;
  fetchData: (id: string, params?: GetCategoryApiOptions) => Promise<void>;
}

const useGetCategoryApi =
  (options?: GetCategoryHookOptions): GetCategoryHookResult => {
    const [response, setResponse] = useState<SingleCategoryApiResponse | null>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setLoading: setAppLoading } = useAppLoading();

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const data = response?.data ?? null;
    const includedData = response?.included ?? [];

    const fetchData = useCallback(
      async (id: string, params?: GetCategoryApiOptions) => {
        setLoading(true);
        setAppLoading(true);

        try {
          const { data: response } = await api.getCategory(id, params);

          setResponse(response);
          setError(null);
          onSuccess(response);
        } catch (error: any) {
          const safeError = error ?? {};

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

export default useGetCategoryApi;
