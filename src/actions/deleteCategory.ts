import { Action, Dispatch } from 'redux';
import noop from 'lodash/fp/noop';

import * as api from 'api';

import { DELETE_CATEGORY } from './types';

export interface DeleteCategoryAction extends Action<'DELETE_CATEGORY'> {
  payload: string;
}

interface DeleteCategoryOptions {
  name: string;
  onCompletion?: () => void;
}

type DeleteCategoryActionCreator =
  (options: DeleteCategoryOptions) => (dispatch: Dispatch<DeleteCategoryAction>) => Promise<void>;

const deleteCategory: DeleteCategoryActionCreator =
  options => async dispatch => {
    const { name } = options;
    const onCompletion = options.onCompletion || noop;

    try {
      await api.deleteCategory(name);
      dispatch({
        type: DELETE_CATEGORY,
        payload: name
      });
    } catch (error: any) {
      console.error(error.message);
    } finally {
      if (typeof onCompletion === 'function') onCompletion();
    }
  };

export default deleteCategory;
