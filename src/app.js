const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const pedidoRoutes = require('./routes/pedido.routes');

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'openapi.yaml'));

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', pedidoRoutes);

module.exports = app;