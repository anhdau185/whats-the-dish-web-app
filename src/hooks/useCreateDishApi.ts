import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Dish, NullableDish, RawDish } from 'models';

import { ApiHookOptions } from '.';

interface CreateDishApiHookOptions extends ApiHookOptions {
  onSuccess?: (data: Dish) => void;
}

interface CreateDishApiHookResult {
  data: NullableDish;
  fetchData: (dish: RawDish) => Promise<void>;
  loading: boolean;
  error: any;
}

const useCreateDishApi =
  (options?: CreateDishApiHookOptions): CreateDishApiHookResult => {
    const [data, setData] = useState<NullableDish>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const onSuccess = options?.onSuccess || noop;
    const onFailure = options?.onFailure || noop;
    const onCompletion = options?.onCompletion || noop;

    const fetchData = useCallback(async (dish: RawDish) => {
      setLoading(true);
      try {
        const { data: { data } } = await api.createDish(dish);
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

export default useCreateDishApi;
