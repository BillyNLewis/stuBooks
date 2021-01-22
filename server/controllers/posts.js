import Post from '../models/post.js';
//file to handle all function[logic] for posts.js in routes folder
//this makes it easier for us to keep track of routes
export const getPosts = (req, res) => {
  Post.find()
    .then((posts) => res.send(posts))
    .catch((error) => res.send(error.message));
};      
export const createPost = (req, res) => {
  //set post equal to data obj from incoming post request
  const post = req.body;
  //create a newPost based on model
  const newPost = new Post(post);
  //save newPost to database
  newPost.save()
  //send new post doc to client
  .then(() => res.send(newPost))
  .catch((error) => res.send(error.message));
};
export const updatePost = (req,res) => {
  const {id: _id} = req.params;//get route parameter id value & assign it to _id
  const post = req.body;
//check if Post with ID exists
  Post.exists({_id: _id})
  .then(exist => {
    if (!exist) {
     res.send('Post Not Found')
    } 
})
//search model & find post with a specific Id then update it's content
Post.findByIdAndUpdate(_id, post, {new: true, useFindAndModify: false})
.then(updatePost => 
  res.send(updatePost));//send a newly updated post doc to client
}
function deletePost(req,res){ 
   //retrieve route parameter
  const {id} = req.params;
   //find post with specific id & delete it
  Post.findByIdAndRemove(id,{useFindAndModify: false})
  .then(() => res.send({message: 'Post deleted'})) 
}

//get all posts made by specific user
function getUserPosts(req,res){
  //retrieve query parameter & use it to query db
  const id = req.query.id;
  Post.find({userId: id}, function(err,doc){
    if(!err){
      res.send(doc);
    }else{
      console.log(err);
    }
  })

}
export {deletePost, getUserPosts}