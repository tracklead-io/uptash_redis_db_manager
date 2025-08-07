Uptash Redis JSON API
API Node.js para manipular "collections" JSON no Uptash Redis, com autenticação via x-api-auth.

📦 Instalação
git clone https://seu-repositorio.git
cd uptash-redis-json-api
npm install

⚙️ Configuração
Crie um arquivo .env na raiz com o conteúdo:

API_AUTH=sua-chave-secreta-aqui
REDIS_URL=rediss://default:SEU_TOKEN_DO_UPTASH@SEU_ENDPOINT_UPTASH:PORT

🚀 Uso
Inicie em modo produção:
npm start

Ou em modo desenvolvimento (com reload automático):
npm run dev

🔒 Autenticação
Todas as rotas exigem o header:

x-api-auth: <SUA_CHAVE_API_AUTH>

📚 Endpoints
Upsert (cria/edita):
PUT /upsert/:collection?param1=valor1&param2=valor2
Body: JSON do objeto

Deletar:
DELETE /delete/:collection?param1=valor1&param2=valor2

Listar:
GET /list/:collection?[paramX=valorX...]

Buscar específico:
GET /find/:collection?param1=valor1&param2=valor2

O nome da collection é dinâmico e vai direto na URL.

Exemplo
PUT /upsert/businesses_tracklead?business_id=biz_123456&business_type=ecommerce
Body:
{
"business_id": "biz_123456",
"business_name": "Loja do João",
"business_type": "ecommerce"
}

🛠 Estrutura de Pastas
uptash-redis-json-api/
│
├── config/
│ └── redis.js
├── middlewares/
│ └── auth.js
├── routes/
│ └── collection.js
├── services/
│ └── collectionService.js
├── utils/
│ └── buildKey.js
├── .env
├── app.js
├── package.json
└── README.md
