import { Action, Reducer } from 'redux';

type PingingReducer = Reducer<boolean, Action<'PING' | 'PONG'>>;

const initialState = false;

const pingingReducer: PingingReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PING':
      return true;
    case 'PONG':
      return false;
    default:
      return state;
  }
};

export default pingingReducer;
