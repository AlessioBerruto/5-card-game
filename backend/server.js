import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import multer from "multer";

// Import dei controller
import { registerUser, loginUser } from "./controllers/authController.js";
import { subscribeToNewsletter } from "./controllers/newsletterController.js";
import { updateUser, deleteUser } from "./controllers/userController.js";
import { handleProfileImageUpload } from "./controllers/imageController.js";
import { addMatch, getMatches, getMatchReport } from "./controllers/matchController.js";

dotenv.config();

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connessione al database riuscita"))
  .catch((err) => console.error("Connessione al database fallita", err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://alessioberruto.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Rotte API
app.post("/api/matches", addMatch);
app.get("/api/matches/:player", getMatches);
app.get("/api/matches/:player/report", getMatchReport);
app.post("/api/register", registerUser);
app.post("/api/login", loginUser);
app.post("/api/subscribe-newsletter", subscribeToNewsletter);
app.put("/api/user", updateUser);
app.delete("/api/user", deleteUser);
app.post("/api/upload-profile-image", upload.single("image"), handleProfileImageUpload);

// Logout
app.post("/api/logout", (req, res) => {
  res.status(200).json({ message: "Logout avvenuto con successo" });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
