import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Category, RawCategory } from 'models';

import { CREATE_CATEGORY } from './types';

export interface CreateCategoryAction extends Action<'CREATE_CATEGORY'> {
  payload: Category;
}

interface CreateCategoryOptions {
  category: RawCategory;
  onCompletion?: () => void;
}

type CreateCategoryActionCreator =
  (options: CreateCategoryOptions) => (dispatch: Dispatch<CreateCategoryAction>) => Promise<void>;

const createCategory: CreateCategoryActionCreator =
  options => async dispatch => {
    const { category } = options;
    const onCompletion = options.onCompletion || noop;

    try {
      const { data: apiResponse } = await api.createCategory(category);
      dispatch({
        type: CREATE_CATEGORY,
        payload: apiResponse.data
      });
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      onCompletion();
    }
  };

export default createCategory;
