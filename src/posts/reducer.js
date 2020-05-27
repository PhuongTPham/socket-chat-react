import {
    GET_POSTS_REQUEST,
    ADD_POSTS_REQUEST,
    EDIT_POSTS_REQUEST,
    DELETE_POSTS_REQUEST,
    SEARCH_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR
} from './action'

export const INITIAL_STATE = {
    result: []
}

export default function reducer(state = INITIAL_STATE, action) {
    
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return {
                ...state,
                processing: true
            };
        case ADD_POSTS_REQUEST:
            return {
                ...state,
                processing: true
            };
        case DELETE_POSTS_REQUEST:
            return {
                ...state,
                processing: true
            };
        case EDIT_POSTS_REQUEST:
            return {
                ...state,
                processing: true
            };
        case SEARCH_POSTS_REQUEST:
            return {
                ...state,
                processing: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                processing: false,
                result: action.result
            };
        case GET_POSTS_ERROR:
            return {
                ...state,
                processing: false,
                error: action.error
            };
        default:
            return state;
    }

}