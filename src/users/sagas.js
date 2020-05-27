import { put, call, takeLatest } from 'redux-saga/effects'
import {
    EDIT_USERS_REQUEST,GET_USERS_REQUEST,
    getUsersError,getUsersSuccess,editUsersRequest,getUsersRequest

} from './actions'
import UserService from './services'

export function* getUserSaga(){
    yield put(getUsersRequest());
    try {
        const data = yield call(UserService.getUser)
        yield put(getUsersSuccess(data))
    } catch (error) {
        yield put(getUsersError(error))
    }
}
export function* editUserSaga(){
    yield put(editUsersRequest());
    try {
        const data = yield call(UserService.editUser)
        yield put(getUsersSuccess(data))
    } catch (error) {
        yield put(getUsersError(error))
    }
}
const sagas = [
    takeLatest(GET_USERS_REQUEST, getUserSaga),
    takeLatest(EDIT_USERS_REQUEST, editUserSaga),

];
export default sagas;

