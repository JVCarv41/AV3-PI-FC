const authService = require('../src/services/authService');
const User = require('../src/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

// Mock the User model constructor and static methods
jest.mock('../src/models/user', () => {
  const mockCtor = jest.fn().mockImplementation(function (data) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.save = jest.fn().mockResolvedValue(this);
  });

  mockCtor.findOne = jest.fn();
  return mockCtor;
});

// Helper para simular Query do Mongoose com .select()
function mockQuery(result) {
  return {
    select: jest.fn().mockResolvedValue(result)
  };
}

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('login throws when user not found', async () => {
    User.findOne.mockReturnValue(mockQuery(null));

    await expect(authService.login('noone@example.com', '12345678'))
      .rejects.toThrow('Usuário não encontrado');
  });

  test('login throws when password invalid', async () => {
    User.findOne.mockReturnValue(mockQuery({ _id: 'id', password: 'hashed' }));
    bcrypt.compare.mockResolvedValue(false);

    await expect(authService.login('user@example.com', 'wrong'))
      .rejects.toThrow('Senha inválida');
  });

  test('login returns token when credentials are valid', async () => {
    User.findOne.mockReturnValue(mockQuery({ _id: 'id', password: 'hashed' }));
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue('fake-token');

    const token = await authService.login('user@example.com', 'correct');

    expect(token).toBe('fake-token');
    expect(jwt.sign).toHaveBeenCalled();
  });

  test('register creates and saves a user', async () => {
    const user = await authService.register('John', 'john@example.com', 'pass1234');

    expect(user).toHaveProperty('email', 'john@example.com');
    expect(user.save).toBeDefined();
  });
});