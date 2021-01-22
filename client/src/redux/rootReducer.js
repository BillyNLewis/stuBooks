import {combineReducers} from 'redux'
import {postReducer} from './post/postReducer'
const rootReducer = combineReducers({
    //state returned by postReducer is stored in posts
    post: postReducer
})
export default rootReducer;