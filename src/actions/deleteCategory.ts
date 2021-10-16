import { Dispatch } from 'redux';

import * as api from 'api';
import {
  AsyncActionCreator,
  DeleteCategoryAction
} from 'actions/declarations';

import { DELETE_CATEGORY } from './types';

const deleteCategory: AsyncActionCreator<DeleteCategoryAction> =
  (onCompletion = null, name: string) =>
    async (dispatch: Dispatch<DeleteCategoryAction>) => {
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
