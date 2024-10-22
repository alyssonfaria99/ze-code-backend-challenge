const express = require('express');
const loadPartnerById = require('./controllers/loadPartnerById.js');
const insertPartner = require('./controllers/insertPartner.js');
const getAllPartners = require('./controllers/getAllPartners.js');
const searchPartner = require('./controllers/searchPartner.js');

const routes = express();

routes.get('/searchPartner', searchPartner);
routes.get('/allPartners', getAllPartners);
routes.get('/:id', loadPartnerById);
routes.post('/insertPartner', insertPartner);

module.exports = routes;