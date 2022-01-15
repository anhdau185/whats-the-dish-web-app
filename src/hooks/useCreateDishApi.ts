import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Dish, NullableDish, RawDish } from 'models';

import { ApiHookOptions, useAppLoading } from '.';

interface CreateDishHookOptions extends ApiHookOptions {
  onSuccess?: (data: Dish) => void;
}

interface CreateDishHookResult {
  data: NullableDish;
  error: any;
  loading: boolean;
  fetchData: (dish: RawDish) => Promise<void>;
}

const useCreateDishApi =
  (options?: CreateDishHookOptions): CreateDishHookResult => {
    const [data, setData] = useState<NullableDish>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setLoading: setAppLoading } = useAppLoading();

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const fetchData = useCallback(async (dish: RawDish) => {
      setLoading(true);
      setAppLoading(true);

      try {
        const {
          data: { data: createdDish }
        } = await api.createDish(dish);

        setData(createdDish);
        onSuccess(createdDish);
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
      loading,
      error,
      fetchData
    };
  };

export default useCreateDishApi;
