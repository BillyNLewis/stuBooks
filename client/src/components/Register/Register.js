import React, { useEffect, useRef, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router';
import {sendUser} from '../../api/user';

function Register() {
  //input validation
  const [input, setInput] = useState({
    displayName: '',
    email: '',
    password: '',
    accountCreated: false,
    errorMessage: {},//display err mess based on which fields are empty
  });
  const [account, setAccount] = useState(false);
  
  function handleChange(e) {//handle input change
    const propToUpdate = e.target.name;
    setInput((prevState) => {
      return { ...prevState, [propToUpdate]: e.target.value };
    });
  }

  function handleSubmit(e) {//handle form submit
    e.preventDefault();
    let errorStatus = false;
    if (input.displayName === '') {
      errorStatus = true;
      setInput((prevState) => {
        return {
          ...prevState,
          errorMessage: { ...prevState.errorMessage, displayName: 'Invalid first name' },
        };
      });
    }
    if (input.email === '') {
      errorStatus = true;
      setInput((prevState) => {
        return {
          ...prevState,
          errorMessage: { ...prevState.errorMessage, email: 'Invalid email' },
        };
      });
    }
    if (input.password === '') {
      errorStatus = true;
      setInput((prevState) => {
        return {
          ...prevState,
          errorMessage: { ...prevState.errorMessage, password: 'Invalid password' },
        };
      });
    }
    if (!errorStatus) {
        setInput((prevState) => {
            return {
              ...prevState,
             accountCreated: true
            };
          });
          setAccount(true);
    }
  }
  //display user's account name in nav bar when account is created
  //here useEffect only fires on state update, & not inital render
  //fires only when form is succefully submited
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isFirstRender.current) {
        sendUser(input);//send/post user's info to db 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  // toggle flag after first render/mounting
  useEffect(() => { 
    isFirstRender.current = false 
  }, [])

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
    {input.accountCreated === true && <Redirect to={{
            pathname: '/',
            state: { fName: input.displayName }
        }}/>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Create an account
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display name"
                autoFocus
                value={input.displayName}
                onChange={handleChange}
                error={!!input.errorMessage.displayName}
                helperText={
                  input.errorMessage.displayName && input.errorMessage.displayName
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={input.email}
                onChange={handleChange}
                error={!!input.errorMessage.email}
                helperText={
                  input.errorMessage.email && input.errorMessage.email
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={input.password}
                onChange={handleChange}
                error={!!input.errorMessage.password}
                helperText={
                  input.errorMessage.password && input.errorMessage.password
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Create account
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Register;
