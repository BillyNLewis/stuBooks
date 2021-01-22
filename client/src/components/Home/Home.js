import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
// import Form from '../Form/Form.js'
import Posts from '../Posts/Posts.js';
import useStyles from './styles.js';
import { getPosts } from '../../redux/action'; //async action creator
import { useDispatch } from 'react-redux'; //dispatch action
import { useLocation } from 'react-router';

function Home(props) {
  const location = useLocation();
  //state use to delete form
  const { accountInfo } = props;
  // //get all posts in db
  // const [allPost, setAllPost] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  //get all posts and store them inside post state in redux store
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.toolbar} />
      {/* get user's name */}
      {location.state?.fName && console.log(location.state?.fName)}
      <main className={classes.content}>
        <Container maxWidth="lg" disableGutters>
          <Grid container justify="center" spacing={4}>
            {/* render all post  */}
            <Posts accountInfo={accountInfo} />
          </Grid>
        </Container>
      </main>
    </div>
  );
}
export default Home;
