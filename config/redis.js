// config/redis.js

const Redis = require('ioredis');

const redisUrl = process.env.REDIS_URL; // ex: "rediss://default:<token>@<host>:<port>"

if (!redisUrl) {
  throw new Error('REDIS_URL não configurada no .env');
}

const redis = new Redis(redisUrl, {
  // Uptash recomenda rediss (SSL), então habilita ssl por padrão
  tls: redisUrl.startsWith('rediss://') ? {} : undefined,
  // Configuração adicional caso queira ajustar (timeout, retry, etc)
});

redis.on('error', (err) => {
  console.error('Erro na conexão com o Redis:', err);
});

module.exports = redis;
