import mongoose from "mongoose";
import bcrypt from "bcrypt";  // Importa bcrypt

// Definizione dello schema utente
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Email deve essere unica
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // Password con lunghezza minima
  },
}, {
  timestamps: true,  // Aggiunge i campi createdAt e updatedAt
});

// Aggiungi un middleware per la crittografia della password prima di salvare l'utente
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Solo se la password è modificata

  // Crittografa la password usando bcrypt
  const salt = await bcrypt.genSalt(10);  // Genera un sale
  this.password = await bcrypt.hash(this.password, salt);  // Crittografa la password
  next();  // Passa al prossimo middleware
});

// Metodo per confrontare le password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);  // Confronta la password
};

// Creazione del modello utente basato sullo schema
const User = mongoose.model("User", userSchema);

export default User;
