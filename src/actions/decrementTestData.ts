import { Action } from 'redux';

import { DECREMENT_TEST_DATA } from './types';

export type DecrementTestDataAction = Action<'DECREMENT_TEST_DATA'>;

const decrementTestData: () => DecrementTestDataAction =
  () => ({ type: DECREMENT_TEST_DATA });

export default decrementTestData;
