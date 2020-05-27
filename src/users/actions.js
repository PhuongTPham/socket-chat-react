
export const GET_USERS_REQUEST = 'GET_USERS_REQUEST'
export function getUsersRequest(){
    return{
        type: GET_USERS_REQUEST,
    };
}

export const EDIT_USERS_REQUEST = 'EDIT_USERS_REQUEST'
export function editUsersRequest(){
    return {
        type: EDIT_USERS_REQUEST,
    };
}

export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
export function getUsersSuccess(data){
    return {
        type: GET_USERS_SUCCESS,
        data,
        result: data.result
    }
}

export const GET_USERS_ERROR = 'GET_USERS_ERROR'
export function getUsersError(error){
    return {
        type: GET_USERS_SUCCESS,
        error,
    }
}