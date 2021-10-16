import { Dispatch } from 'redux';

import * as api from 'api';
import { CategoryModel } from 'models';
import {
  AsyncActionCreator,
  CreateCategoryAction
} from 'actions/declarations';

import { CREATE_CATEGORY } from './types';

const createCategory: AsyncActionCreator<CreateCategoryAction> =
  (onCompletion = null, category: CategoryModel) =>
    async (dispatch: Dispatch<CreateCategoryAction>) => {
      try {
        const { data } = await api.createCategory(category);
        dispatch({
          type: CREATE_CATEGORY,
          payload: data.createdCategory
        });
      } catch (error: any) {
        console.error(error.message);
      } finally {
        if (typeof onCompletion === 'function') onCompletion();
      }
    };

export default createCategory;
