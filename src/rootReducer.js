import { combineReducers } from 'redux'

import user from './users/reducers'
import post from './posts/reducer'

const rootReducer = combineReducers({
    user,
    post
})
export default rootReducer