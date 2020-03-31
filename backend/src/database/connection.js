const knex = require('knex');
const configuration = require('./../../knexfile');

// Conexão de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;