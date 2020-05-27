import { all, call } from 'redux-saga/effects';

//import userSaga from './users/sagas';
import postSaga from './posts/saga';


export default function* rootSaga() {
  
  // yield fork (postSaga)
  yield all([
    // userSaga,
    call(postSaga),
  ]);
}
