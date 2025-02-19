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
			default: false,
		},
		playerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", function (next) {
	if (!this.playerId) {
		this.playerId = this._id;
	}
	next();
});

const User = mongoose.model("User", userSchema);

export default User;
