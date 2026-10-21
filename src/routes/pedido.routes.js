const { Router } = require('express');
const controller = require('../controllers/pedido.controller');

const router = Router();

router.post('/pedidos', controller.createPedido);

module.exports = router;