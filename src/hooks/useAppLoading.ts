import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { appLoadingSelector } from 'reducers/state';
import { setAppLoadingAC } from 'actions';

interface AppLoadingHookResult {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

const useAppLoading = (): AppLoadingHookResult => {
  const dispatch = useDispatch();
  const loading = useSelector(appLoadingSelector);

  const setLoading = useCallback((value: boolean) => {
    dispatch(setAppLoadingAC(value));
  }, []);

  return { loading, setLoading };
};

export default useAppLoading;
