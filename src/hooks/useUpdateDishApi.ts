import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Dish, NullableDish, RawDish } from 'models';

import { ApiHookOptions } from '.';

interface UpdateDishHookOptions extends ApiHookOptions {
  onSuccess?: (data: Dish) => void;
}

interface UpdateDishHookResult {
  data: NullableDish;
  error: any;
  loading: boolean;
  fetchData: (id: string, dish: RawDish) => Promise<void>;
}

const useUpdateDishApi =
  (options?: UpdateDishHookOptions): UpdateDishHookResult => {
    const [data, setData] = useState<NullableDish>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const fetchData = useCallback(async (id: string, dish: RawDish) => {
      setLoading(true);

      try {
        const { data: { data } } = await api.updateDish(id, dish);

        setData(data);
        onSuccess(data);
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
      data,
      error,
      loading,
      fetchData
    };
  };

export default useUpdateDishApi;
