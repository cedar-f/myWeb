const fs = require('fs');

module.exports.requireAuth = function (req, res, next) {
    if (!req.cookies.login) {
        res.redirect('/auth');
    }

    var data = fs.readFileSync('./model/account.json');
    var listacc = JSON.parse(data);
    var user = listacc.accounts.filter(x => x.cookie == req.cookies.login);
    if (user.length == 0) {
        res.render('./auth');
        return;
    }
    res.locals.userName = user[0].name;

    next();


};