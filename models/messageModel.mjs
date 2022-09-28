import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
	{
		message: {
			text: {
				type: String,
				required: true,
			}
		},
		users: Array,
		sender: {
			type: String,
			ref: 'User',
			required: true,
		},
	},
	{timestamps: true},
);

const MessageModel = mongoose.model('MessageModel', messageSchema);

export {
	MessageModel,
};
