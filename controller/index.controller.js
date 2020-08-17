const fs = require('fs');

module.exports.index = function (req, res) {
    res.render('index', {
        title: 'myWeb',
        user: res.locals.userName ? res.locals.userName : ""
    });
};

module.exports.logout = function (req, res) {

    fs.readFile('./model/account.json', function (err, data) {
        var listacc = JSON.parse(data);
        listacc.accounts.find(x => x.cookie == req.cookies.login).cookie = "";
        fs.writeFileSync('./model/account.json', JSON.stringify(listacc));
    });
    res.clearCookie('login');
    res.redirect('/auth');

}