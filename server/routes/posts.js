// create a router module, then mount the router module on a path in index.js.
import express from 'express';

import {getPosts, createPost, updatePost, deletePost,
getUserPosts} from '../controllers/posts.js'
const router = express.Router();

//handle requests to users path
router.get('/', getPosts);
router.post('/', createPost);
//update existing doc using the doc's id from url
router.patch('/:id', updatePost);
//delete existing doc using the doc's id from url
router.delete('/:id', deletePost);
//get all posts made from a specific user using userId sent to req.body
router.get('/getUserPosts/', getUserPosts);
export default router;