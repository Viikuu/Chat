import {Router} from 'express';
import {login,  allusers} from '../controlers/usersController.mjs';

const userRoutes = Router();

userRoutes.post("/login", login);
userRoutes.get("/allusers", allusers);

export {
	userRoutes,
};
