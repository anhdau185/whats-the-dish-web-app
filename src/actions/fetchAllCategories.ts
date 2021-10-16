import { Dispatch } from 'redux';

import * as api from 'api';
import {
  AsyncActionCreator,
  FetchCategoriesAction
} from 'actions/declarations';

import { FETCH_ALL_CATEGORIES } from './types';

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const fetchAllCategories: AsyncActionCreator<FetchCategoriesAction> =
  (onCompletion = null) =>
    async (dispatch: Dispatch<FetchCategoriesAction>) => {
      try {
        const { data } = await api.fetchCategories();
        dispatch({
          type: FETCH_ALL_CATEGORIES,
          payload: data.categories
        });
      } catch (error: any) {
        console.error(error.message);
      } finally {
        if (typeof onCompletion === 'function') onCompletion();
      }
    };

export default fetchAllCategories;
