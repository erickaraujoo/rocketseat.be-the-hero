const express = require('express');
const routes = require('./routes');
const cors = require('cors');

// Criando a aplicação
const app = express();

// Habilitando regras de CORS
// Quando for mandar para a produção, precisamos passar a origem (link) que será o endereço que utilizará a aplicação
/**
 * Habilitando regras de CORS
 * 
 * Quando for mandar para a produção, precisamos passar a origem (link) que será o endereço que utilizará a aplicação
 * 
 * app.use(cors({ origin: 'http://meuapp.com' }) )
*/
app.use(cors());

// Antes de todas as requisições, pede pro Express ir no corpo das requisições e tornar a requisição em formato JSON
app.use(express.json());
app.use(routes);

/**
 * Rota / Recuros
*/

/**
 * Métodos HTTP:
 * 
 * GET: Buscar/listar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end 
*/

/**
 * Tipos de parâmetros
 * 
 * Query Params: Parâmetros nomeados enviados na rota após o simbolo '?', geralmente servem para filtros, paginação
 * Route Params: Parâmetros utilizados para identificar recursos após o simbolo ':'
 * Request Body: Corpo da requisição utilizado para criar ou alterar recursos
 * 
*/

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
*/

 /**
  * Driver: SELECT * FROM users;
  * Query Builder: table('users').select(1*).where()
  * 
*/

// Faz o aplicativo ficar ouvindo a porta 3333
// porta mais recomendada para a linguagem Node
app.listen(3333);