require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const collectionRoutes = require('./routes/collection');
const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Middleware de autenticação para todas as rotas da API
app.use(authMiddleware);

// Rotas principais (dinâmicas)
app.use('/', collectionRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

// Error handler global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Uptash Redis JSON rodando na porta ${PORT}`);
});

module.exports = app;
