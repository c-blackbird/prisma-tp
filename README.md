# TP — Prisma ORM + Swagger

API de checkout de pedidos construida con **Node.js + Express + Prisma ORM** sobre **PostgreSQL (Neon)**, documentada con **OpenAPI 3.0** y **Swagger UI**.

El flujo principal procesa una compra dentro de una transacción SQL, descuenta stock y hace rollback automático si no hay inventario suficiente.

---

## Tecnologías

- Node.js
- Express
- Prisma ORM 6
- PostgreSQL (Neon)
- Swagger UI + OpenAPI 3.0
- dotenv

---

## Arquitectura por capas
