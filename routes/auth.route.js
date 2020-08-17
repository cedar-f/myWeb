const express = require('express');
const bodyParser = require('body-parser');
const authControler = require('../controller/auth.controller');


const route = express.Router();

route.use(bodyParser.urlencoded({
    extended: true
}));

route.get('/', authControler.getAuth);

route.post('/', authControler.postAuth);

module.exports = route;