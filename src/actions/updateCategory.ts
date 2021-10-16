import { Dispatch } from 'redux';

import * as api from 'api';
import { CategoryModel } from 'models';
import {
  AsyncActionCreator,
  UpdateCategoryAction
} from 'actions/declarations';

import { UPDATE_CATEGORY } from './types';

const updateCategory: AsyncActionCreator<UpdateCategoryAction> =
  (onCompletion = null, name: string, category: CategoryModel) =>
    async (dispatch: Dispatch<UpdateCategoryAction>) => {
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
