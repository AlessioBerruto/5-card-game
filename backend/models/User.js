import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		profileImage: {
			type: String,
			default: null,
		},
		isSubscribedToNewsletter: { 
			type: Boolean, 
			default: false 
		},
		achievements: [
			{
				id: Number,
				text: String,
				unlocked: { type: Boolean, default: false },
			},
		],
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

export default User;
