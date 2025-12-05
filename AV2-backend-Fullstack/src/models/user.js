const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define o schema de usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },           // Nome obrigatório
  email: { type: String, required: true, unique: true }, // E-mail obrigatório e único
  password: { type: String, required: true, select: false } // Senha obrigatória (não retorna no find())
});

// Hook para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Se não mudou, segue
  this.password = await bcrypt.hash(this.password, 10); // Hash na senha
  next();
});

// Exporta o modelo
module.exports = mongoose.model('User', userSchema);
