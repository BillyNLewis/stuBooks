import User from '../models/users.js'
//create new user and save it to db
function createUser(req,res){
//set user equal to data from incoming post request
const user = req.body;
//create a newUser based on User model
const newUser = new User(user);
//save newUser to database
newUser.save()
.then(() => res.send(newUser))
.catch((error) => res.send(error.message));
}
//get user's info from User model
function getUser(req, res){
    const email = req.body.email;
    const password = req.body.password;
//find a user whose email & password macthes the email & password from req.body
   User.findOne({email: email, password: password}, function (err,doc){
        res.send(doc);//send obj if found, send '' if not found
   })
  };   
export {createUser, getUser}