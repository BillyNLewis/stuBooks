import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';//alows us to share resources across multiple domains
//import router
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
app.use(cors());
//set up bodyparser to parse incoming http requests to req.body
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true }));
//connect route to client using express USE middleware
//set up all the routes inside routes dir for better readability.
//[route inside postRoutes will be activated once user lands on /posts path]
app.use('/posts', postRoutes);//handle requests to /posts path
app.use('/users', userRoutes);//handle requests to /users path

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

//connect to database using mongoose
mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log('Server is running on port: ' + PORT)))
    .catch((error) => console.log(error.message));

