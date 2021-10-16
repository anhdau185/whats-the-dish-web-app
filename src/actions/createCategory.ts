import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { CategoryModel } from 'models';

import { CREATE_CATEGORY } from './types';

export interface CreateCategoryAction extends Action<'CREATE_CATEGORY'> {
  payload: CategoryModel;
}

interface CreateCategoryOptions {
  category: CategoryModel;
  onCompletion?: () => void;
}

type CreateCategoryActionCreator =
  (options: CreateCategoryOptions) => (dispatch: Dispatch<CreateCategoryAction>) => Promise<void>;

const createCategory: CreateCategoryActionCreator =
  options => async dispatch => {
    const { category } = options;
    const onCompletion = options.onCompletion || noop;

    try {
      const { data } = await api.createCategory(category);
      dispatch({
        type: CREATE_CATEGORY,
        payload: data.createdCategory
      });
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      onCompletion();
    }
  };

export default createCategory;
