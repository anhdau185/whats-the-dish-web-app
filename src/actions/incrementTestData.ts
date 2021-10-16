import {
  ActionCreator,
  TestDataAction
} from 'actions/declarations';

import { INCREMENT_TEST_DATA } from './types';

const incrementTestData: ActionCreator<TestDataAction> =
  (): TestDataAction => ({ type: INCREMENT_TEST_DATA });

export default incrementTestData;
