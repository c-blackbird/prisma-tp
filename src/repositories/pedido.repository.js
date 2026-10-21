const prisma = require('../config/prisma');

class PedidoRepository {
  async findAll() {
    return prisma.pedido.findMany({
      include: { detalles: true, usuario: true },
    });
  }

  async findById(id) {
    return prisma.pedido.findUnique({
      where: { id },
      include: { detalles: true, usuario: true },
    });
  }

  async checkoutTransaccional(usuarioId, productos) {
    return prisma.$transaction(async (tx) => {
      const pedido = await tx.pedido.create({
        data: { usuarioId, total: 0, estado: 'PENDIENTE' },
      });

      let total = 0;

      for (const item of productos) {
        const producto = await tx.producto.findUnique({
          where: { id: item.productoId },
        });
        if (!producto) {
          throw new Error(`Producto ${item.productoId} no existe`);
        }

        const nuevoStock = producto.stock - item.cantidad;
        if (nuevoStock < 0) {
          throw new Error(`Stock insuficiente para producto ${producto.nombre}`);
        }

        await tx.producto.update({
          where: { id: producto.id },
          data: { stock: nuevoStock },
        });

        const subtotal = Number(producto.precio) * item.cantidad;
        total += subtotal;

        await tx.detallePedido.create({
          data: {
            pedidoId: pedido.id,
            productoId: producto.id,
            cantidad: item.cantidad,
            precioUnit: producto.precio,
          },
        });
      }

      return tx.pedido.update({
        where: { id: pedido.id },
        data: { total, estado: 'CONFIRMADO' },
        include: { detalles: true },
      });
    });
  }
}

module.exports = new PedidoRepository();