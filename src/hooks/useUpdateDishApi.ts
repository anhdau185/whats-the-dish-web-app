import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Dish, NullableDish, RawDish } from 'models';

import { ApiHookOptions } from '.';

interface UpdateDishApiHookOptions extends ApiHookOptions {
  onSuccess?: (data: Dish) => void;
}

interface UpdateDishApiHookResult {
  data: NullableDish;
  fetchData: (id: string, dish: RawDish) => Promise<void>;
  loading: boolean;
  error: any;
}

const useUpdateDishApi =
  (options?: UpdateDishApiHookOptions): UpdateDishApiHookResult => {
    const [data, setData] = useState<NullableDish>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const onSuccess = options?.onSuccess || noop;
    const onFailure = options?.onFailure || noop;
    const onCompletion = options?.onCompletion || noop;

    const fetchData = useCallback(async (id: string, dish: RawDish) => {
      setLoading(true);
      try {
        const { data: { data } } = await api.updateDish(id, dish);
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

export default useUpdateDishApi;