// create a router module, then mount the router module on a path in index.js.
import express from 'express';

import {createUser, getUser} from '../controllers/users.js'
const router = express.Router();

//handle requests to users path
router.post('/', createUser);
//retrieve user's data from db
router.post('/getUser', getUser);

export default router;