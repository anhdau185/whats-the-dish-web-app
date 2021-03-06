import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';

import { ApiHookOptions, useAppLoading } from '.';

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
    const { setLoading: setAppLoading } = useAppLoading();

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const fetchData = useCallback(async (id: string) => {
      setLoading(true);
      setAppLoading(true);

      try {
        await api.deleteCategory(id);

        setError(null);
        onSuccess();
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
      error,
      loading,
      fetchData
    };
  };

export default useDeleteCategoryApi;
