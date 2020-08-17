const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')




const controller = require('../../controller/customer/customer.controller');

const route = express.Router();

route.use(bodyParser.urlencoded({
    extended: true
}));

route.get('/', controller.customer);

route.get('/delete', controller.del_customer)

route.post('/create', controller.create_customer);

module.exports = route;