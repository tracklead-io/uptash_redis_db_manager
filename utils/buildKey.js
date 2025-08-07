// utils/buildKey.js

/**
 * Constrói a chave Redis para a collection.
 * Exemplo: para 'businesses_tracklead', retorna 'collection:businesses_tracklead'
 */
function buildKey(collectionName) {
  if (!collectionName) throw new Error('Collection name é obrigatório');
  return `collection:${collectionName}`;
}

module.exports = buildKey;
