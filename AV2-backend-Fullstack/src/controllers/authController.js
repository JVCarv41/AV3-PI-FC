const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Use env var

// REGISTRO
const register = async (name, email, password) => {
  // Verifica se o e-mail já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("Erro: Email ja esta em uso");
    throw new Error('Email ja esta em uso');
  }

  // Cria novo usuário
  const newUser = new User({
    name,
    email,
    password
  });

  return await newUser.save();
};

// LOGIN
const login = async (email, password) => {
  // Verifica se o usuário existe
  const user = await User.findOne({ email }).select('+password'); // Inclui senha
  if (!user) {
    console.log("Erro: Email ou senha invalido(s)");
    throw new Error('Email ou senha invalido(s)');
  }

  // Compara a senha
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log("Erro: Email ou senha invalido(s)");
    throw new Error('Email ou senha invalido(s)');
  }

  // Gera token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

module.exports = {
  register,
  login
};
