import { Reducer } from 'redux';

import {
  IncrementTestDataAction,
  DecrementTestDataAction
} from 'actions';
import {
  INCREMENT_TEST_DATA,
  DECREMENT_TEST_DATA
} from 'actions/types';

type TestDataReducer =
  Reducer<number, IncrementTestDataAction | DecrementTestDataAction>;

const testDataReducer: TestDataReducer =
  (prevState = 0, action) => {
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
