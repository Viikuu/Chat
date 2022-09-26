import {UserModel} from '../models/userModel.mjs';
import process from 'node:process';
import dotenv from 'dotenv';

dotenv.config();

const login = async (request, response, next) => {
	try {
		const {username, password} = request.body;
		const user = await UserModel.findOne({username});
		if (!user) {
			return response.json({message: "Incorrect username or password", status: false});
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if(!isPasswordValid) {
			return response.json({message: "Incorrect username or password", status: false});
		}
		delete user.password;

		response.cookie('refreshToken', await user.generateAuthToken(), {
			httpOnly: true,
		});
		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}

const allusers = async (request, response, next) => {
	try {
		const users = await UserModel.find({_id:{$ne:request.params.id}}).select([
			"username",
			"avatarColor",
			"_id",
		]);
		return response.json({users})
	} catch (error) {
		next(error);
	}
}

export {
	login,
	allusers,
};
