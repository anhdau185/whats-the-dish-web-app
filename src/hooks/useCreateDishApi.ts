import { useCallback, useState } from 'react';

import * as api from 'api';
import { NullableDish, RawDish } from 'models';

interface CreateDishHookResult {
  data: NullableDish;
  fetchData: (dish: RawDish) => void;
  loading: boolean;
  error: any;
}

const useCreateDishApi = (): CreateDishHookResult => {
  const [data, setData] = useState<NullableDish>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchData = useCallback((dish: RawDish) => {
    setLoading(true);
    api.createDish(dish)
      .then(({ data: apiResponse }) => setData(apiResponse.data))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    fetchData,
    loading,
    error
  };
};

export default useCreateDishApi;
