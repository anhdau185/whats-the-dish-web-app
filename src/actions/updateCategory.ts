import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { CategoryModel } from 'models';

import { UPDATE_CATEGORY } from './types';

export interface UpdateCategoryAction extends Action<'UPDATE_CATEGORY'> {
  payload: CategoryModel;
}

interface UpdateCategoryOptions {
  name: string;
  category: CategoryModel;
  onCompletion?: () => void;
}

type UpdateCategoryActionCreator =
  (options: UpdateCategoryOptions) => (dispatch: Dispatch<UpdateCategoryAction>) => Promise<void>;

const updateCategory: UpdateCategoryActionCreator =
  options => async dispatch => {
    const { name, category } = options;
    const onCompletion = options.onCompletion || noop;

    try {
      const { data } = await api.updateCategory(name, category);
      dispatch({
        type: UPDATE_CATEGORY,
        payload: data.updatedCategory
      });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      if (typeof onCompletion === 'function') onCompletion();
    }
  };

export default updateCategory;
