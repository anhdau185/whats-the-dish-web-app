import { useCallback, useState } from 'react';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Nullable } from 'utils';
import { Category, RawCategory } from 'models';

import { ApiHookOptions, useAppLoading } from '.';

interface CreateCategoryHookOptions extends ApiHookOptions {
  onSuccess?: (data: Category) => void;
}

interface CreateCategoryHookResult {
  data: Nullable<Category>;
  error: any;
  loading: boolean;
  fetchData: (category: RawCategory) => Promise<void>;
}

const useCreateCategoryApi =
  (options?: CreateCategoryHookOptions): CreateCategoryHookResult => {
    const [data, setData] = useState<Nullable<Category>>(null);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { setLoading: setAppLoading } = useAppLoading();

    const onSuccess = options?.onSuccess ?? noop;
    const onFailure = options?.onFailure ?? noop;
    const onCompletion = options?.onCompletion ?? noop;

    const fetchData = useCallback(async (category: RawCategory) => {
      setLoading(true);
      setAppLoading(true);

      try {
        const {
          data: { data: createdCategory }
        } = await api.createCategory(category);

        setData(createdCategory);
        setError(null);
        onSuccess(createdCategory);
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

export default useCreateCategoryApi;
