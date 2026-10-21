const pedidoService = require('../services/pedido.service');

exports.createPedido = async (req, res) => {
  try {
    const { usuarioId, productosComprados } = req.body;

    if (usuarioId === undefined || !Array.isArray(productosComprados)) {
      return res.status(400).json({
        error: 'usuarioId y productosComprados son obligatorios',
      });
    }

    const pedido = await pedidoService.checkout(usuarioId, productosComprados);
    return res.status(201).json(pedido);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({ error: error.message });
  }
};