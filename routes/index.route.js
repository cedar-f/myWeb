const express = require('express');
var cookieParser = require('cookie-parser');



const customer_route = require('./customer/customer.routes');
const gallery_route = require('./gallery/gallery.routes');
const auth_route = require('./auth.route');
const requireAuth = require('../middleware/auth.middleware/auth.middleware');

const controller = require('../controller/index.controller');


const port = 8000;
const app = express();
app.use(cookieParser())


app.set('views', './view/');
app.set('view engine', 'pug');

app.get('/logout', controller.logout);
app.get('/', requireAuth.requireAuth, controller.index);



app.use(express.static('./public'));
app.use('/auth', auth_route);
app.use('/customer', requireAuth.requireAuth, customer_route);
app.use('/gallery', requireAuth.requireAuth, gallery_route);

app.use(function (req, res) {
    res.render('./404/404page.pug');
});

app.listen(port, () => {
    console.log('app listening at localhost ' + port);
})