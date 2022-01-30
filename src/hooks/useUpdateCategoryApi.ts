import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Category, NullableCategory, PartialRawCategory} from 'models';

import { ApiHookOptions, useAppLoading } from '.';

interface UpdateCategoryHookOptions extends ApiHookOptions {
  onSuccess?: (data: Category) => void;
}

interface UpdateCategoryHookResult {
  data: NullableCategory;
  error: any;
  loading: boolean;
  fetchData: (id: string, category: PartialRawCategory) => Promise<void>;
}

const useUpdateCategoryApi =
  (options?: UpdateCategoryHookOptions): UpdateCategoryHookResult => {
    const [data, setData] = useState<NullableCategory>(null);
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
        const { data: { data } } = await api.updateCategory(id, category);

        setData(data);
        setError(null);
        onSuccess(data);
      } catch (error: any) {
        const safeError = error ?? {};

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
