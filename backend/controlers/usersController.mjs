import {UserModel} from '../models/userModel.mjs';
import dotenv from 'dotenv';

dotenv.config();

const login = async (request, response, next) => {
	try {
		const {name} = request.body;
		const user = await UserModel.findOne({name});
		if (user === null) {
			await UserModel.create({
				name,
			});
		}
		return response.json({status: true});
	} catch (error) {
		next(error);
	}
}

const allusers = async (request, response, next) => {
	try {
		const users = await UserModel.find().select([
			"name",
			"_id",
		]);
		return response.json({status:true,users})
	} catch (error) {
		next(error);
	}
}

export {
	login,
	allusers,
};
