import { Reducer } from 'redux';

import { TestDataAction } from 'actions/declarations';
import {
  INCREMENT_TEST_DATA,
  DECREMENT_TEST_DATA
} from 'actions/types';

const testDataReducer: Reducer<number, TestDataAction> =
  (prevState = 0, action: TestDataAction): number => {
    switch (action.type) {
      case INCREMENT_TEST_DATA:
        return prevState + 1;
      case DECREMENT_TEST_DATA:
        return prevState - 1;
      default:
        return prevState;
    }
  };

export default testDataReducer;
