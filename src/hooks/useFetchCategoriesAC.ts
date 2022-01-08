import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLoadingSelector, categoriesSelector } from 'reducers/state';

import enableAppLoading from 'actions/enableAppLoading';
import disableAppLoading from 'actions/disableAppLoading';
import fetchAllCategories from 'actions/fetchAllCategories';
import { Category } from 'models';

const useFetchCategoriesAC = (): {
  loading: boolean,
  data: Category[]
} => {
  const dispatch = useDispatch();
  const loading = useSelector(appLoadingSelector);
  const data = useSelector(categoriesSelector);

  useEffect(() => {
    dispatch(enableAppLoading());
    dispatch(
      fetchAllCategories({
        onCompletion: () => dispatch(disableAppLoading())
      })
    );
  }, []);

  return { loading, data };
};

export default useFetchCategoriesAC;
