// services/collectionService.js

const redis = require('../config/redis');
const buildKey = require('../utils/buildKey');

/**
 * Busca toda a collection (array de objetos).
 */
async function getCollection(collectionName) {
  const key = buildKey(collectionName);
  const data = await redis.get(key);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/**
 * Salva (substitui) toda a collection.
 */
async function saveCollection(collectionName, arr) {
  const key = buildKey(collectionName);
  await redis.set(key, JSON.stringify(arr));
}

/**
 * Adiciona ou atualiza (upsert) um item com base nos filtros de query.
 * @param {string} collectionName 
 * @param {object} filters 
 * @param {object} newData 
 */
async function upsertItem(collectionName, filters, newData) {
  const collection = await getCollection(collectionName);
  const idx = collection.findIndex(item =>
    Object.entries(filters).every(([k, v]) => item[k] === v)
  );

  if (idx !== -1) {
    // Atualiza
    collection[idx] = { ...collection[idx], ...newData };
  } else {
    // Adiciona
    collection.push(newData);
  }
  await saveCollection(collectionName, collection);
  return collection[idx !== -1 ? idx : collection.length - 1];
}

/**
 * Remove item(s) que combinam com os filtros.
 */
async function deleteItem(collectionName, filters) {
  let collection = await getCollection(collectionName);
  const originalLength = collection.length;

  collection = collection.filter(
    item => !Object.entries(filters).every(([k, v]) => item[k] === v)
  );

  const deleted = originalLength !== collection.length;
  await saveCollection(collectionName, collection);
  return deleted;
}

/**
 * Lista itens (com filtro parcial opcional).
 */
async function listItems(collectionName, filters = {}) {
  const collection = await getCollection(collectionName);
  if (!filters || Object.keys(filters).length === 0) return collection;

  return collection.filter(item =>
    Object.entries(filters).every(([k, v]) => item[k] === v)
  );
}

/**
 * Busca o primeiro item que bate com todos os filtros.
 */
async function findItem(collectionName, filters) {
  const collection = await getCollection(collectionName);
  return collection.find(item =>
    Object.entries(filters).every(([k, v]) => item[k] === v)
  );
}

module.exports = {
  getCollection,
  saveCollection,
  upsertItem,
  deleteItem,
  listItems,
  findItem,
};
