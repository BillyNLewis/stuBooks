import React, { useEffect, useState } from 'react'
import Home from './Home/Home'
import {CssBaseline }from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Form from './Form/Form'
import Register from './Register/Register'
import Login from './Login/Login'
import MyListings from './MyListing/MyListing'
function App() {
//lift up state & pass it across multiple compo. Once its set() gets invoked.
//All of the correspondings components will make use of the updated state.
//state that holds user's _id, displayName, email. If null, user has not logged in
  const [accountInfo, setAccountInfo] = useState(null);

  //get user info session storage & set it to accountInfo
  const userData = sessionStorage.getItem('user');
 
  useEffect(()=>{
    setAccountInfo(JSON.parse(userData));
  },[userData])
console.log(accountInfo);
   //state that allows user to select a form for edit and deletion by id
   const [currentId, setCurrentId] = useState(null);//track user selected post
  
  return (
    <Router>
      <div className='App'>
      <CssBaseline/>
      <Navbar accountInfo = {accountInfo} setAccountInfo = {setAccountInfo}/>
      <Switch>
          <Route exact path="/">
            <Home 
            />
          </Route>
          <Route exact path="/sell">
            <Form currentId={currentId} setCurrentId= {setCurrentId}
              accountInfo = {accountInfo}
            />
          </Route>
          <Route exact path="/myListings">
            <MyListings accountInfo = {accountInfo} 
            />
          </Route>
          <Route exact path="/login">
            <Login setAccountInfo = {setAccountInfo}/>
          </Route>
          <Route exact path="/register">
            <Register setAccountInfo = {setAccountInfo}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
