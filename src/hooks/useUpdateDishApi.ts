import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Nullable } from 'utils';
import { Dish, PartialRawDish } from 'models';

import { ApiHookOptions, useAppLoading } from '.';

interface UpdateDishHookOptions extends ApiHookOptions {
  onSuccess?: (data: Dish) => void;
}

interface UpdateDishHookResult {
  data: Nullable<Dish>;
  error: any;
  loading: boolean;
  fetchData: (id: string, dish: PartialRawDish) => Promise<void>;
}

const useUpdateDishApi =
  (options?: UpdateDishHookOptions): UpdateDishHookResult => {
    const [data, setData] = useState<Nullable<Dish>>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setLoading: setAppLoading } = useAppLoading();

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const fetchData = useCallback(async (id: string, dish: PartialRawDish) => {
      setLoading(true);
      setAppLoading(true);

      try {
        const { data: { data } } = await api.updateDish(id, dish);

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

export default useUpdateDishApi;
