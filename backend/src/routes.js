const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

// LOGIN
routes.post('/sessions', SessionController.create);

// ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create );

// CASOS
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

// PROFILE
routes.get('/profile', ProfileController.index);

module.exports = routes;