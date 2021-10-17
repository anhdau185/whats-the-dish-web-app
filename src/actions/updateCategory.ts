import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';
import { Category, RawCategory } from 'models';

import { UPDATE_CATEGORY } from './types';

interface UpdateCategoryOptions {
  id: string;
  category: RawCategory;
  onCompletion?: () => void;
}

export interface UpdateCategoryAction extends Action<'UPDATE_CATEGORY'> {
  payload: Category;
}

type UpdateCategoryActionCreator =
  (options: UpdateCategoryOptions) => (dispatch: Dispatch<UpdateCategoryAction>) => Promise<void>;

const updateCategory: UpdateCategoryActionCreator =
  options => async dispatch => {
    const { id, category } = options;
    const onCompletion = options.onCompletion || noop;

    try {
      const { data: apiResponse } = await api.updateCategory(id, category);
      dispatch({
        type: UPDATE_CATEGORY,
        payload: apiResponse.data
      });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      onCompletion();
    }
  };

export default updateCategory;
