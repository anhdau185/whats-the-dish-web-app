import { handleActions } from 'redux-actions';

const pingingReducer = handleActions<boolean, undefined>({
  PING: () => true,
  PONG: () => false
}, false);

export default pingingReducer;
