const pedidoRepository = require('../repositories/pedido.repository');

class PedidoService {
  async checkout(usuarioId, productosComprados) {
    if (!usuarioId || !Array.isArray(productosComprados) || productosComprados.length === 0) {
      const err = new Error('Datos de pedido incompletos');
      err.status = 400;
      throw err;
    }

    for (const p of productosComprados) {
      if (!p.productoId || !p.cantidad || p.cantidad <= 0) {
        const err = new Error('Cada producto requiere productoId y cantidad > 0');
        err.status = 400;
        throw err;
      }
    }

    try {
      return await pedidoRepository.checkoutTransaccional(usuarioId, productosComprados);
    } catch (error) {
      if (/Stock insuficiente|no existe/.test(error.message)) {
        error.status = 400;
      }
      throw error;
    }
  }
}

module.exports = new PedidoService();