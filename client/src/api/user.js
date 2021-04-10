import axios from 'axios';
//url that points to backend users route
// const url = 'http://localhost:5000/users';
const url = 'https://stubooks.herokuapp.com/users';
// post new user in db using post request
function sendUser(newUser) {
  return axios.post(url, newUser);
}
//get user's account info from db
//Note:GET requests can't send data to request body. So use POST instead.
//Or You can pass params along with GET Request using params prop.
function getUser(userInfo) {
  return axios.post(url + '/getUser', userInfo);
}

export { sendUser, getUser };
