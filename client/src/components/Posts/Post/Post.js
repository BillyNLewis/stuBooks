import React, { useState } from 'react';
import useStyles from './styles.js';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import {deletePost} from '../../../redux/action';
import {useDispatch} from 'react-redux';
import { Redirect } from 'react-router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Post(props) {
  const dispatch = useDispatch();
  const { post, editAbility} = props;
 const [editPage,setEditPage] = useState(false);//redirect user to edit page
  const classes = useStyles();
//redirect to Form.js & fill form with data from a specific post. 
  function editPost(){
  setEditPage(true);
  }

  return (
    <Card className={classes.card}>
    {editPage && <Redirect to={{
            pathname: '/sell',
            state: { postId: post._id }
        }}/>}
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
      />
      {/* <CardMedia className={classes.media}>
      <img src={post.selectedFile} alt=''></img>
      </CardMedia> */}
      <div className={classes.overlay}>
    <Typography className={classes.wrapIcon} variant="h6"><AccountCircleIcon/>&ensp;{post.creator}</Typography>
      </div>
      {editAbility&& 
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" onClick={editPost}>
        <Typography variant="body1">Edit</Typography>
        </Button>
      </div>}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          Seller's email: {post.email}
        </Typography>
      </div>
      <CardContent>
      <Typography  gutterBottom variant="h6">
         {post.title}
        </Typography>
        <Typography  variant='body1' color='textSecondary' gutterBottom >
          Price: <span className={classes.price}>${post.price}</span> 
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
      {/* {!editAbility &&
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button>
      } */}
      <Typography  variant='caption' color='textSecondary' gutterBottom >
           Course: {post.course}
        </Typography>
        {editAbility&& 
        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        }
      </CardActions>
    </Card>
  );
}
export default Post;
