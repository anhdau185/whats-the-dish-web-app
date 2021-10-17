import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Category } from 'models';

import { FETCH_ALL_CATEGORIES } from './types';

interface FetchCategoriesOptions {
  onCompletion?: () => void;
}

export interface FetchCategoriesAction extends Action<'FETCH_ALL_CATEGORIES'> {
  payload: Category[];
}

type FetchCategoriesActionCreator =
  (options?: FetchCategoriesOptions) => (dispatch: Dispatch<FetchCategoriesAction>) => Promise<void>;

const fetchAllCategories: FetchCategoriesActionCreator =
  (options = {}) => async dispatch => {
    const onCompletion = options.onCompletion || noop;

    try {
      const { data: apiResponse } = await api.fetchCategories();
      dispatch({
        type: FETCH_ALL_CATEGORIES,
        payload: apiResponse.data
      });
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      onCompletion();
    }
  };

export default fetchAllCategories;
