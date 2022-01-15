import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';

import { ApiHookOptions } from '.';

interface DeleteCategoryHookOptions extends ApiHookOptions {
  onSuccess?: () => void;
}

interface DeleteCategoryHookResult {
  error: any;
  loading: boolean;
  fetchData: (id: string) => Promise<void>;
}

const useDeleteCategoryApi =
  (options?: DeleteCategoryHookOptions): DeleteCategoryHookResult => {
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const fetchData = useCallback(async (id: string) => {
      setLoading(true);

      try {
        await api.deleteCategory(id);
        onSuccess();
      } catch (error: any) {
        const safeError = error ?? {};

        setError(safeError);
        onFailure(safeError);
      } finally {
        setLoading(false);
        onCompletion();
      }
    }, []);

    return {
      error,
      loading,
      fetchData
    };
  };

export default useDeleteCategoryApi;
