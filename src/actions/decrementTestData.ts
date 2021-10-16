import {
  ActionCreator,
  TestDataAction
} from 'actions/declarations';

import { DECREMENT_TEST_DATA } from './types';

const decrementTestData: ActionCreator<TestDataAction> =
  (): TestDataAction => ({ type: DECREMENT_TEST_DATA });

export default decrementTestData;
