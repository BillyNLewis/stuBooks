import React from 'react';
//select state in redux store
import { useSelector } from 'react-redux';
import Post from './Post/Post.js';
import {CircularProgress, Grid} from '@material-ui/core/';
import useStyles from './styles.js';

function Posts(props){
    const {editAbility} = props;
    const classes = useStyles();
  
    //select/access post array state in redux store
    const posts = useSelector((state) => state.post);//post array contains all post
  
    // console.log(posts);
    return(
        posts.length === 0
        ? <CircularProgress/>
        : (<Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => { return(
            <Grid key ={post._id} item xs={12} sm={6} md={4} lg={3} >
                <Post post={post} 
                    editAbility={editAbility}
                />
            </Grid>
        )})}
          </Grid>
        
    ));
}
export default Posts;