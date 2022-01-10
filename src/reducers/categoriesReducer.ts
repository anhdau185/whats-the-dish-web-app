import { Reducer } from 'redux';

import { Category } from 'models';

type CategoriesReducer = Reducer<
  Category[],
  any
>;

const categoriesReducer: CategoriesReducer =
  (prevState = [], action) => {
    switch (action.type) {
      default:
        return prevState;
    }
  };

export default categoriesReducer;
