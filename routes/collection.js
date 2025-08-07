// routes/collection.js

const express = require('express');
const router = express.Router();
const collectionService = require('../services/collectionService');

/**
 * Helper para extrair filtros dos query params (exceto vazios)
 */
function extractFilters(query) {
  const filters = {};
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== '') {
      filters[key] = value;
    }
  }
  return filters;
}

/**
 * PUT /upsert/:collection
 * Adiciona/edita (upsert) um item na collection
 */
router.put('/upsert/:collection', async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const filters = extractFilters(req.query);
    const data = req.body;
    if (!collectionName || !data || Object.keys(filters).length === 0)
      return res.status(400).json({ error: 'Collection, body e filtros obrigatórios' });

    const item = await collectionService.upsertItem(collectionName, filters, data);
    return res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir/atualizar item', detail: err.message });
  }
});

/**
 * DELETE /delete/:collection
 * Remove item da collection conforme filtros
 */
router.delete('/delete/:collection', async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const filters = extractFilters(req.query);
    if (!collectionName || Object.keys(filters).length === 0)
      return res.status(400).json({ error: 'Collection e filtros obrigatórios' });

    const deleted = await collectionService.deleteItem(collectionName, filters);
    if (deleted) {
      return res.json({ success: true });
    }
    return res.status(404).json({ error: 'Item não encontrado para exclusão' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar item', detail: err.message });
  }
});

/**
 * GET /list/:collection
 * Lista todos os itens da collection, pode receber filtros via query
 */
router.get('/list/:collection', async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const filters = extractFilters(req.query);
    if (!collectionName)
      return res.status(400).json({ error: 'Collection obrigatória' });

    const items = await collectionService.listItems(collectionName, filters);
    return res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar items', detail: err.message });
  }
});

/**
 * GET /find/:collection
 * Busca um item específico na collection conforme filtros
 */
router.get('/find/:collection', async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const filters = extractFilters(req.query);
    if (!collectionName || Object.keys(filters).length === 0)
      return res.status(400).json({ error: 'Collection e filtros obrigatórios' });

    const item = await collectionService.findItem(collectionName, filters);
    if (!item) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    return res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar item', detail: err.message });
  }
});

module.exports = router;
