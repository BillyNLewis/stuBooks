import axios from 'axios';
//url that points to backend posts route
// const url = 'http://localhost:5000/posts';
const url = 'https://stubooks.herokuapp.com/posts;'
//get all posts in database
function fetchPosts() {
  return axios.get(url);
}
// post new data in db using post request
function sendPost(newPost) {
  return axios.post(url, newPost);
}
//update a post in db using patch request
function updatePost(id, updatedPost) {
  return axios.patch(url + '/' + id, updatedPost);
}
// delete a post in db using delete request
function deletePost(id, deletePost) {
  return axios.delete(url + '/' + id, deletePost);
}
//get all posts made by a specific user
//send obj as a query parameter[key/value pair to the right of ?] to the url
function getUserPosts(id) {
  return axios.get(url + '/getUserPosts', { params: { id: id } });
}
export { fetchPosts, sendPost, updatePost, deletePost, getUserPosts };
