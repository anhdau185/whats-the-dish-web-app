import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';

import { ApiHookOptions } from '.';

interface DeleteDishApiHookResult {
  fetchData: (id: string) => Promise<void>;
  loading: boolean;
  error: any;
}

const useDeleteDishApi =
  (options?: ApiHookOptions): DeleteDishApiHookResult => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const onSuccess = options?.onSuccess || noop;
    const onFailure = options?.onFailure || noop;
    const onCompletion = options?.onCompletion || noop;

    const fetchData = useCallback(async (id: string) => {
      setLoading(true);
      try {
        await api.deleteDish(id);
        onSuccess();
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
      fetchData,
      loading,
      error
    };
  };

export default useDeleteDishApi;
