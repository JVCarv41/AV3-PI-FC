const ShoppingList = require('../models/shoppingList');

exports.create = (userId, data) => {
  return ShoppingList.create({ ...data, user: userId });
};

exports.getAll = (userId) => {
  return ShoppingList.find({ user: userId });
};

exports.getById = (userId, id) => {
  return ShoppingList.findOne({ _id: id, user: userId });
};

exports.update = (userId, id, data) => {
  return ShoppingList.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true, runValidators: true }
  );
};

exports.partialUpdate = (userId, id, data) => {
  return ShoppingList.findOneAndUpdate(
    { _id: id, user: userId },
    { $set: data },
    { new: true, runValidators: true }
  );
};

exports.remove = (userId, id) => {
  return ShoppingList.findOneAndDelete({ _id: id, user: userId });
};
