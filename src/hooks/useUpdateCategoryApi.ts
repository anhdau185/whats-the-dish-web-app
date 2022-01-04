import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Category, NullableCategory, RawCategory } from 'models';

import { ApiHookOptions } from '.';

interface UpdateCategoryApiHookOptions extends ApiHookOptions {
  onSuccess?: (data: Category) => void;
}

interface UpdateCategoryApiHookResult {
  data: NullableCategory;
  fetchData: (id: string, category: RawCategory) => Promise<void>;
  loading: boolean;
  error: any;
}

const useUpdateCategoryApi =
  (options?: UpdateCategoryApiHookOptions): UpdateCategoryApiHookResult => {
    const [data, setData] = useState<NullableCategory>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const onSuccess = options?.onSuccess || noop;
    const onFailure = options?.onFailure || noop;
    const onCompletion = options?.onCompletion || noop;

    const fetchData = useCallback(async (id: string, category: RawCategory) => {
      setLoading(true);
      try {
        const { data: { data } } = await api.updateCategory(id, category);
        setData(data);
        onSuccess(data);
      } catch (error: any) {
        const safeError = error || {};
        setError(safeError);
        onFailure(safeError);
      } finally {
        setLoading(false);
        onCompletion();
      }
    }, []);

    return {
      data,
      fetchData,
      loading,
      error
    };
  };

export default useUpdateCategoryApi;
