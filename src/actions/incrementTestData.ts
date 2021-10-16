import { Action } from 'redux';

import { INCREMENT_TEST_DATA } from './types';

export type IncrementTestDataAction = Action<'INCREMENT_TEST_DATA'>;

const incrementTestData: () => IncrementTestDataAction =
  () => ({ type: INCREMENT_TEST_DATA });

export default incrementTestData;
