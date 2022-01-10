import { Reducer } from 'redux';

import { NullableCategory } from 'models';

export type CurrentCategoryReducer =
  Reducer<NullableCategory, any>;

const currentCategoryReducer: CurrentCategoryReducer =
  (prevState = null, action) => {
    switch (action.type) {
      default:
        return prevState;
    }
  };

export default currentCategoryReducer;
