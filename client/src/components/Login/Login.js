import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles';
import {getUser }from '../../api/user.js';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom'
export default function Login(props) {
    const {setAccountInfo} = props;
  const classes = useStyles();
    const [loginError, setLoginError] = useState(false);//display err message
    const [loginStatus, setLoginStatus] = useState(false);//redirect user to home
    const [userInfo, setUserInfo] = useState({email:'',password:''})
    //set useInfo state to current value of input box
    function handleChange(e){
        const propToUpdate = e.target.name;
        const propValue = e.target.value;
        setUserInfo(prevState => {
            return {
                ...prevState,
                [propToUpdate]: propValue
            }
        })
    }
  
  function handleSubmit(e){
    e.preventDefault();
    //get user account info from db
     getUser(userInfo)
     .then(user => {
         if(user.data !== ''){//if user exists in db. save userData in sessionStorage
            sessionStorage.setItem('user', JSON.stringify(user.data));
            const userData = sessionStorage.getItem('user');
            setAccountInfo(JSON.parse(userData));
            setLoginStatus(true);
         }else{
             setLoginError(true);
         }
     })
     .catch(error => console.log(error))
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
     {loginStatus && <Redirect to={{
            pathname: '/'
        }}/>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={userInfo.email}
            onChange={handleChange}
            error = {loginError}
            helperText={loginError && 'The email or password is incorrect.'}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userInfo.password}
            onChange={handleChange}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="./register" variant="body2" className={classes.register}>
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}