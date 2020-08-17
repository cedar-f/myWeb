const fs = require('fs');





module.exports.customer = function (req, res) {
    var data = JSON.parse(fs.readFileSync('./model/db.json'));
    res.render('./customer/customer', {
        title: 'CUSTOMER',
        customers: data.customers,
        user: res.locals.userName ? res.locals.userName : ""
    });
}

module.exports.del_customer = function (req, res) {
    var id = req.query.id;
    var data = JSON.parse(fs.readFileSync('./model/db.json', ));
    var jsonObj = data.customers.filter(function (val, index, arr) {
        return val.id != id
    });
    jsonObj = {
        customers: jsonObj
    }
    var jsonString = JSON.stringify(jsonObj)
    fs.writeFileSync('./model/db.json', jsonString);

    res.end();
}


module.exports.create_customer = function (req, res) {
    var data = JSON.parse(fs.readFileSync('./model/db.json', ));
    data.customers.push(req.body);
    var jsonString = JSON.stringify(data)
    fs.writeFileSync('./model/db.json', jsonString);
    res.end();
}