const shoppingListService = require('../src/services/shoppingService');
const ShoppingList = require('../src/models/shoppingList');

// Mock do model ShoppingList
jest.mock('../src/models/shoppingList', () => ({
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  findOneAndDelete: jest.fn()
}));

describe('shoppingListService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('create calls ShoppingList.create with userId', async () => {
    const userId = 'user123';
    const data = { name: 'Lista 1' };
    const mockResult = { _id: '123', ...data, user: userId };

    ShoppingList.create.mockResolvedValue(mockResult);

    const result = await shoppingListService.create(userId, data);

    expect(ShoppingList.create).toHaveBeenCalledWith({
      ...data,
      user: userId
    });

    expect(result).toEqual(mockResult);
  });

  test('getAll calls find with userId', async () => {
    const userId = 'userABC';
    const mockResult = [{ id: 1 }, { id: 2 }];

    ShoppingList.find.mockResolvedValue(mockResult);

    const result = await shoppingListService.getAll(userId);

    expect(ShoppingList.find).toHaveBeenCalledWith({ user: userId });
    expect(result).toEqual(mockResult);
  });

  test('getById calls findOne with user and _id', async () => {
    const userId = 'userXYZ';
    const id = 'list1';
    const mockResult = { _id: id, user: userId };

    ShoppingList.findOne.mockResolvedValue(mockResult);

    const result = await shoppingListService.getById(userId, id);

    expect(ShoppingList.findOne).toHaveBeenCalledWith({
      _id: id,
      user: userId
    });

    expect(result).toEqual(mockResult);
  });

  test('update calls findOneAndUpdate with correct params', async () => {
    const userId = 'u1';
    const id = 'l1';
    const data = { name: 'Atualizado' };
    const mockResult = { _id: id, user: userId, ...data };

    ShoppingList.findOneAndUpdate.mockResolvedValue(mockResult);

    const result = await shoppingListService.update(userId, id, data);

    expect(ShoppingList.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id, user: userId },
      data,
      { new: true, runValidators: true }
    );

    expect(result).toEqual(mockResult);
  });

  test('partialUpdate calls findOneAndUpdate with $set', async () => {
    const userId = 'u2';
    const id = 'l2';
    const data = { name: 'Parcial' };
    const mockResult = { _id: id, user: userId, ...data };

    ShoppingList.findOneAndUpdate.mockResolvedValue(mockResult);

    const result = await shoppingListService.partialUpdate(userId, id, data);

    expect(ShoppingList.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id, user: userId },
      { $set: data },
      { new: true, runValidators: true }
    );

    expect(result).toEqual(mockResult);
  });

  test('remove calls findOneAndDelete with user and id', async () => {
    const userId = 'u3';
    const id = 'l3';
    const mockResult = { deleted: true };

    ShoppingList.findOneAndDelete.mockResolvedValue(mockResult);

    const result = await shoppingListService.remove(userId, id);

    expect(ShoppingList.findOneAndDelete).toHaveBeenCalledWith({
      _id: id,
      user: userId
    });

    expect(result).toEqual(mockResult);
  });
});