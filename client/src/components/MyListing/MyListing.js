import React, { useCallback, useEffect, useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts.js';
import useStyles from './styles.js';
import { useDispatch } from 'react-redux'; //dispatch action
import {getUserListings} from '../../redux/action'

function MyListing(props) {
  //state that allows user to select form for edit
  const { accountInfo } = props;
   //give user the ability to edit post
   const [editAbility, setEditAbility] = useState(false);
  
  const classes = useStyles();
  const dispatch = useDispatch();
  
 const fetchUserListings = useCallback(() => {
    dispatch(getUserListings(accountInfo._id))
    .then(() => setEditAbility(true));
 },[accountInfo, dispatch])
 //call async action creator that fetches user's posts
  useEffect(() => {
    fetchUserListings();
  }, [fetchUserListings])
  return (
    <div>
    <div className={classes.toolbar} />
      <main className={classes.content}>
        <Container maxWidth="lg" disableGutters>
          <div className={classes.toolbar} />
          <Grid container justify="center" spacing={4}>
            {/* render users posts from API*/}
            {editAbility && <Posts editAbility={editAbility}/>}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
export default MyListing;
