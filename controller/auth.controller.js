const shortID = require('shortid');
const fs = require('fs');


module.exports.getAuth = function (req, res) {
    fs.readFile('./model/account.json', function (err, data) {
        if (req.cookies.login) {
            var listacc = JSON.parse(data);
            var user = listacc.accounts.filter(x => x.cookie == req.cookies.login);
            if (user) {
                res.redirect('/')
                return;
            }
            res.clearCookie('login');
            res.redirect('/auth');
            res.end();
            return;
        }
        res.render('./auth');
    });
};

module.exports.postAuth = function (req, res) {
    fs.readFile('./model/account.json', function (err, data) {
        if (err) {
            res.end(err.message);
            return;
        }
        var listacc = JSON.parse(data);
        var user = listacc.accounts.filter(x => x.name == req.body.name);
        if (user.length == 0) {
            var err = 'wrong user name';
            res.render('./auth', {
                err: err,

            });
            return;
        }
        if (user[0].pass != req.body.pass) {
            var err = 'wrong password';
            res.render('./auth', {
                err: err,
                acc: user[0].name
            });
            return;
        }
        var cookie = shortID.generate();
        res.cookie("login", cookie);
        res.redirect('/');
        listacc.accounts.find(x => x.name == req.body.name).cookie = cookie;
        fs.writeFileSync('./model/account.json', JSON.stringify(listacc));
    });
};