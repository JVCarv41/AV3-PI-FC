const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shoppingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.post('/', (req, res, next) => {
  console.log('Rota de criar lista de mercado');
  next();
}, shoppingController.create);

router.get('/', (req, res, next) => {
  console.log('Rota de conseguir todas as listas de mercado');
  next();
}, shoppingController.getAll);

router.get('/:id', (req, res, next) => {
  console.log('Rota de conseguir lista de mercado pelo seu ID');
  next();
}, shoppingController.getById);

router.put('/:id', (req, res, next) => {
  console.log('Rota de atualizar lista de mercado');
  next();
}, shoppingController.update);

router.patch('/:id', (req, res, next) => {
  console.log('Rota de atualizacao parcial da lista de mercado');
  next();
}, shoppingController.partialUpdate);

router.delete('/:id', (req, res, next) => {
  console.log('Rota de remover lista de mercado');
  next();
}, shoppingController.remove);

module.exports = router;
