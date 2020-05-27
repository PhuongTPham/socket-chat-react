import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import initialState from './initial-state';
import reducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = 
  applyMiddleware(sagaMiddleware,logger)(createStore);
const store = createStoreWithMiddleware(
  reducer,initialState);
sagaMiddleware.run(rootSaga);
//store.subscribe(() => {});

export default store;


// const sagaMiddleware = createSagaMiddleware();

// const configureStore = createStore(
//   reducer,
//   initialState,
//   compose(
//     applyMiddleware(
//       sagaMiddleware,
//       logger
//     ),
//     window.devToolsExtension ? window.devToolsExtension() : f => f // Chrome Redux DevTools extension
//   )
// );
// sagaMiddleware.run(rootSaga);
// configureStore.subscribe(()=>{})               

// export default configureStore;


