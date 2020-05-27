import { put, call, takeLatest, takeEvery } from 'redux-saga/effects'
import PostService from './service'
import {
    GET_POSTS,
    getPostsRequest,addPostsRequest,deletePostsRequest,editPostsRequest,
    getPostsSuccess,getPostsError
} from './action'

export function* getPostsSaga(){

    yield put(getPostsRequest());
    try {
        const data = yield call(PostService.getPosts);
        console.log(data);
        yield put(getPostsSuccess(data));
    } catch (error) {
        yield put(getPostsError(error))
    }
}
export function* getPostSaga(){
    yield put(getPostsRequest());
    try {
        const data = yield call(PostService.getPost)
        yield put(getPostsSuccess(data))
    } catch (error) {
        yield put(getPostsError(error))
    }
}
export function* addPostSaga(){
    yield put(addPostsRequest());
    try {
        const data = yield call(PostService.addPost)
        yield put(getPostsRequest(data))
    } catch (error) {
        yield put(getPostsError(error))
    }
}
export function* editPostSaga(){
    yield put(editPostsRequest());
    try {
        const data = yield call(PostService.editPost)
        yield put(getPostsRequest(data))
    } catch (error) {
        yield put(getPostsError(error))
    }
}
export function* deletePostSaga(){
    yield put(deletePostsRequest());
    try {
        const data = yield call(PostService.deletePost)
        yield put(getPostsRequest(data))
    } catch (error) {
        yield put(getPostsError(error))
    }
}


export default function* Saga(){
    yield takeLatest(GET_POSTS, getPostsSaga);
    // yield takeLatest(GET_POSTS_REQUEST, getPostSaga);
    // yield takeLatest(d, addPostSaga);
    // yield takeLatest(EDIT_POSTS_REQUEST, editPostSaga);
    // yield takeLatest(DELETE_POSTS_REQUEST, deletePostSaga)
}

