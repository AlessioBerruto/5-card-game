import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
	player: { type: String, required: true },
	opponent: { type: String, required: true },
	result: { type: String, enum: ["win", "draw", "loss"], required: true },
	date: { type: Date, default: Date.now },
});  

const Match = mongoose.model("Match", matchSchema);
export default Match;
