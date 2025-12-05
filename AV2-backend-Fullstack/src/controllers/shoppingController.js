const mongoose = require('mongoose');
const shoppingService = require('../services/shoppingService');

// Cria uma nova lista de compras
exports.create = async (req, res) => {
  try {
    const { date, products } = req.body;
    const userId = req.userId;

    // Verifique se req.userId é uma string válida para ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'userId invalido' });
    }
      
    // Certifique-se de que a data está sendo passada corretamente
    const shoppingList = await shoppingService.create(
      userId,
      {
        date: new Date(date), // Garante que a data seja um objeto Date válido
        products
    });

    res.status(201).json(shoppingList);
  } catch (err) {
    if (err.name == 'ValidationError'){
      const firstError = Object.entries(err.errors)[0];

      if (firstError) {
        const [field, error] = firstError;

        let errorMessage;

        if (error.kind === 'date') {
          errorMessage = "Data inválida. Favor inserir uma data no estilo YYYY-MM-DD";
        } else {
          errorMessage = error.message;
        }

        console.log(`Erro durante execução: ${errorMessage}`)
        return res.status(400).json({ error: errorMessage });
      }
    }
  }
};

// Retorna todas as listas de compras do usuário
exports.getAll = async (req, res) => {
  try {
    const lists = await shoppingService.getAll(req.userId);
    res.json(lists);
  } catch (err) {
    console.log(`Erro durante execução: ${err.message}`)
    res.status(500).json({ error: err.message });
  }
};

// Retorna uma lista específica pelo ID
exports.getById = async (req, res) => {
  try {
    const list = await shoppingService.getById(req.userId, req.params.id);
    if (!list) return res.status(404).json({ message: 'Lista não encontrada' });
    res.json(list);
  } catch (err) {
    console.log(`Erro durante execução: ${err.message}`)
    res.status(500).json({ error: err.message });
  }
};

// Atualiza todos os dados de uma lista
exports.update = async (req, res) => {
  try {
    const updated = await shoppingService.update(req.userId, req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.log(`Erro durante execução: ${err.message}`)
    res.status(400).json({ error: err.message });
  }
};

// Atualização parcial de uma lista
exports.partialUpdate = async (req, res) => {
  try {
    const updated = await shoppingService.partialUpdate(req.userId, req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.log(`Erro durante execução: ${err.message}`)
    res.status(400).json({ error: err.message });
  }
};

// Remove uma lista de compras
exports.remove = async (req, res) => {
  try {
    await shoppingService.remove(req.userId, req.params.id);
    res.status(204).send();
  } catch (err) {
    console.log(`Erro durante execução: ${err.message}`)
    res.status(400).json({ error: err.message });
  }
};
