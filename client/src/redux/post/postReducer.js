import {FETCH_ALL, CREATE, UPDATE, DELETE} from './postType'
const initialState = [];

function postReducer(state = initialState, action){
switch(action.type){
    case FETCH_ALL:
//return new state & set equal to action.payload array. Each obj in array rep a post
        return action.payload;
    case CREATE:
//return new state & set equal to [] which has copies of the og post and add new post
        return [...state, action.payload];
    case UPDATE:
//only update post whose id matches the updated post id which is return by API
        return state.map(state => state._id === action.payload._id
        ?action.payload//add new payload obj to array returned by map
        :state);//add obj of current iteration to array returned by map
    case DELETE:
//filter array and return new array that does not have deleted post
        return state.filter(post => post._id !== action.payload)
    default: 
        return state;
}
}
export {postReducer}