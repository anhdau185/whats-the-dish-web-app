import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';

import { ApiHookOptions, useAppLoading } from '.';

interface DeleteDishHookOptions extends ApiHookOptions {
  onSuccess?: () => void;
}

interface DeleteDishHookResult {
  error: any;
  loading: boolean;
  fetchData: (id: string) => Promise<void>;
}

const useDeleteDishApi =
  (options?: DeleteDishHookOptions): DeleteDishHookResult => {
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
        await api.deleteDish(id);
        onSuccess();
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
      error,
      loading,
      fetchData
    };
  };

export default useDeleteDishApi;
