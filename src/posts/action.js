export const GET_POSTS='GET_POSTS'
export function getPosts(){
    return{
        type: GET_POSTS,
    };
}

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST'
export function getPostsRequest(){
    return{
        type: GET_POSTS_REQUEST,
    };
}

export const ADD_POSTS_REQUEST = 'ADD_POSTS_REQUEST'
export const ADD_POSTS = 'ADD_POSTS'
export function addPostsRequest(data){

    return {
        type: ADD_POSTS,
    };
}

export const EDIT_POSTS_REQUEST = 'EDIT_POSTS_REQUEST'
export function editPostsRequest(){
    return {
        type: EDIT_POSTS_REQUEST,
    };
}

export const DELETE_POSTS_REQUEST = 'DELETE_POSTS_REQUEST'
export function deletePostsRequest(){
    return {
        type: DELETE_POSTS_REQUEST
    }
}

export const SEARCH_POSTS_REQUEST = 'SEARCH_POSTS_REQUEST'
export function searchPostsRequest(){
    return {
        type: SEARCH_POSTS_REQUEST
    }
}

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS'
export function getPostsSuccess(data){
    return {
        type: GET_POSTS_SUCCESS,
        data,
        result: data.result
    }
}

export const GET_POSTS_ERROR = 'GET_POSTS_ERROR'
export function getPostsError(error){
    return {
        type: GET_POSTS_SUCCESS,
        error,
    }
}