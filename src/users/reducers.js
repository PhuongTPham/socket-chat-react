import {
    GET_USERS_REQUEST,
    EDIT_USERS_REQUEST,
    GET_USERS_ERROR,
    GET_USERS_SUCCESS
} from './actions'

export const INITIAL_STATE = {
    result: []
}

export default function reducers(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                processing: true
            };
        case EDIT_USERS_REQUEST:
            return {
                ...state,
                processing: true
            };
        case GET_USERS_SUCCESS:
            return {
                ...state,
                processing: false,
                    result: action.result
            };
        case GET_USERS_ERROR:
            return {
                ...state,
                processing: false,
                    error: action.error
            };
        default:
            return state;
    }
}