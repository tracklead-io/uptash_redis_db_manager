// middlewares/auth.js

module.exports = function (req, res, next) {
  const apiKey = req.header('x-api-auth');
  const validApiKey = process.env.API_AUTH;

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ error: 'Não autorizado. API Auth inválido.' });
  }

  next();
};
