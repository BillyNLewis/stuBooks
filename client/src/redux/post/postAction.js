import {FETCH_ALL, CREATE, UPDATE, DELETE} from './postType'

//import all functions that deals with api
import * as api from '../../api'
//define action creators
function fetchAll(data){
    return {
        type: FETCH_ALL,
        payload: data
    }
}
function create(data){
    return{
        type: CREATE,
        payload: data
    }
}
function update(data){
    return {
        type: UPDATE,
        payload: data
    }
}
function deleteAPost(id){
    return {
        type: DELETE,
        payload: id
    }
}

//define async action creator to performs async tasks and dispatch regular actions
function getPosts(){
    return (dispatch) => {
        api.fetchPosts()
        .then(response => {
            const data = response.data
            dispatch(fetchAll(data))
        })
        .catch(error => console.log(error.message))
    }
}
function createPost(newPost){
    return (dispatch) => {
        api.sendPost(newPost)
        .then(response => {
            const data = response.data
            dispatch(create(data))
        })
         .catch(error => console.log(error.message))
    }
}
function updatePost(id,post){
    return (dispatch) => {
        api.updatePost(id,post)
        .then(response => {
            const data = response.data
            dispatch(update(data))
        })
        .catch(error => console.log(error))
    }
}
function deletePost(id){
    return (dispatch) => {
        api.deletePost(id)
        .then(() => {
            dispatch(deleteAPost(id))
        })
        .catch(error => console.log(error))
    }
}

function getUserListings(id){
    return (dispatch) => {
        return new Promise((resolve, reject) => {
        api.getUserPosts(id)
        .then(response => {
            const data = response.data
            dispatch(fetchAll(data))
            resolve();
        })
        .catch(error => {
            console.log(error.message);
            resolve();
        });
    })
}
}
export {fetchAll, getPosts, createPost, updatePost, deletePost, getUserListings}