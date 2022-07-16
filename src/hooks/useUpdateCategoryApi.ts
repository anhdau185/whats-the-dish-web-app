import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Nullable } from 'utils';
import { Category, PartialRawCategory} from 'models';

import { ApiHookOptions, useAppLoading } from '.';

interface UpdateCategoryHookOptions extends ApiHookOptions {
  onSuccess?: (data: Category) => void;
}

interface UpdateCategoryHookResult {
  data: Nullable<Category>;
  error: any;
  loading: boolean;
  fetchData: (id: string, category: PartialRawCategory) => Promise<void>;
}

const useUpdateCategoryApi =
  (options?: UpdateCategoryHookOptions): UpdateCategoryHookResult => {
    const [data, setData] = useState<Nullable<Category>>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setLoading: setAppLoading } = useAppLoading();

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const fetchData = useCallback(async (id: string, category: PartialRawCategory) => {
      setLoading(true);
      setAppLoading(true);

      try {
        const { data: { data: apiResponse } } = await api.updateCategory(id, category);

        setData(apiResponse);
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
    }, []);

    return {
      data,
      error,
      loading,
      fetchData
    };
  };

export default useUpdateCategoryApi;
