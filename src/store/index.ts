import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers, { GlobalState } from 'reducers';
import { AppAction } from 'actions/declarations';

const store: Store<GlobalState, AppAction> = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
