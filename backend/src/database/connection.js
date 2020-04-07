const knex = require('knex');
const configuration = require('./../../knexfile');

// Variáveis ambientes para verificar se estamos no ambiente de produção ou de testes
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

// Conexão de desenvolvimento
const connection = knex(config);

module.exports = connection;