import { Store, AnyAction, createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { GlobalState } from 'reducers';
import rootEpic from 'epics';

const epicMiddleware: EpicMiddleware<AnyAction, AnyAction, GlobalState> = createEpicMiddleware();

const configureStore = (): Store<GlobalState, AnyAction> => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
