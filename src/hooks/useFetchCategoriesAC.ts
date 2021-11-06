import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appLoadingSelector, categoriesSelector } from 'reducers/state';
import isEmpty from 'lodash/fp/isEmpty';

import enableAppLoading from 'actions/enableAppLoading';
import disableAppLoading from 'actions/disableAppLoading';
import fetchAllCategories from 'actions/fetchAllCategories';

const useFetchCategoriesAC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(appLoadingSelector);
  const data = useSelector(categoriesSelector);

  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(enableAppLoading());
      dispatch(
        fetchAllCategories({
          onCompletion: () => dispatch(disableAppLoading())
        })
      );
    }
  }, []);

  return { loading, data };
};

export default useFetchCategoriesAC;
