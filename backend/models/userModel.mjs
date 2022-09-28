import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true
		},
	},
);

const UserModel = mongoose.model('User', userSchema);

export {
	UserModel,
};
