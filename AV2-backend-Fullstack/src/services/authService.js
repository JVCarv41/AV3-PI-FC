const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Serviço para registrar novo usuário
const register = async (name, email, password) => {
  const user = new User({ name, email, password });
  await user.save(); // Salva no banco
  return user;
};

// Serviço para login
const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password'); // Busca o usuário incluindo senha
  if (!user) throw new Error('Usuário não encontrado');

  const isMatch = await bcrypt.compare(password, user.password); // Compara senha enviada com hash
  if (!isMatch) throw new Error('Senha inválida');

  // Gera token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Exporta os serviços
module.exports = { register, login };
