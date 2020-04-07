const express = require('express');

// Para validações de campos
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// LOGIN
// Validação para verificar se o ID está sendo passado
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
    }),
}) , SessionController.create);

// ONGS
routes.get('/ongs', OngController.index);
// Fazendo primeiro a validação dos dados e depois a inserção da ONG
routes.post('/ongs', celebrate({
    // Validando parâmetros do corpo da requisição
    // Entre colchetes para indicar a chave do valor
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(), // Verificando se é um email
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create );

// CASOS
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().max(300),
        value: Joi.number().required()
    }),
}) , IncidentController.create);

// Validação de um QUERY pages passado pela URL, apenas número
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    }),
}) , IncidentController.index);

// Validando o parâmetro ID, apenas numérico
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}) , IncidentController.delete);

// PROFILE
routes.get('/profile', celebrate({
    // Verificando se existe o id da ONG no cabeçalho da requisição (HEADERS), para poder navegar na página
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(), // Como são muitos métodos dentro do Headers, então descarta o restante que não está dentro da validação
}), ProfileController.index);

module.exports = routes;