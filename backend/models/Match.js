import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
	playerId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	playerName: { type: String, required: true },
	opponent: { type: String, required: true },
	result: {
		type: String,
		enum: ["vittoria", "pareggio", "sconfitta"],
		required: true,
	},
	date: { type: Date, default: Date.now },
});

export default mongoose.model("Match", matchSchema);
