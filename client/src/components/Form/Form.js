import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './styles.js';
import FileBase from 'react-file-base64'//convert binary files like imgs to text 
import {useDispatch, useSelector} from 'react-redux'
import {createPost, updatePost} from '../../redux/action'
import { Redirect } from 'react-router';
import { useLocation } from 'react-router';
import InputAdornment from '@material-ui/core/InputAdornment';

export default function Form(props) {
    const location = useLocation();

  const classes = useStyles();
  const {currentId, setCurrentId, accountInfo} = props;
  const [formsubmit, setFormSubmit] = useState(false);
  setCurrentId(null);//reset form fields
  
    const [postData, setPostData] = useState({
        creator: accountInfo.displayName, 
        title:'',course:'',email:accountInfo.email, price:'', selectedFile:'',
        userId: accountInfo._id
    })
   
    //get postId from Redirect prop if it exists
    location.state?.postId && setCurrentId(location.state?.postId);
    //retreive post obj for selected post if user selected a post to edit
    const post = useSelector((state) => currentId
    ? state.post.find(p => p._id === currentId)//return array containg an obj/post
    : null);
    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    },[post])
    const dispatch = useDispatch();
    //update current or create new post
    function handleSubmit(e){
        e.preventDefault();//prevent broswer from refreshing
        if(currentId){
            dispatch(updatePost(currentId, postData));
        }else{//if currentId is null
            dispatch(createPost(postData));
        }
        clear();
        setFormSubmit(true);
    }
    function clear(){//clear form after submitting
        setCurrentId(null);
        setPostData({creator: accountInfo.displayName, title:'',course:'', price:'',
        email:accountInfo.email,selectedFile:'',userId: ''});
    }
  return (
    <Container component="main" maxWidth="xs" className={classes.main}>
     {!accountInfo && <Redirect to={{
            pathname: '/'
        }}/>}
        {formsubmit && <Redirect to={{
            pathname: '/'
        }}/>}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MenuBookOutlinedIcon  />
        </Avatar>
        <Typography component="h1" variant="h5">
          {currentId ?'buy': 'Sell a book' }
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
           <TextField 
            name='title' 
            margin="normal"
            variant='outlined' 
            label='book title' 
            fullWidth
            value={postData.title}
            onChange={(e) => setPostData({...postData, title: e.target.value})}
            />
             <TextField 
            name='course' 
            margin="normal"
            variant='outlined' 
            label='course' 
            fullWidth
            value={postData.course}
            onChange={(e) => setPostData({...postData, course: e.target.value})}
            />
              <TextField 
            name='course' 
            margin="normal"
            variant='outlined' 
            label='price' 
            InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
            fullWidth
            value={postData.price}
            onChange={(e) => setPostData({...postData, price: e.target.value})}
            />
          
           <div className={classes.fileInput}>
                <FileBase
                type='file'
                    multiple={false}
                    onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                />
            </div>
            <Button className={classes.submit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
          
        </form>
      </div>
    </Container>
  );
}