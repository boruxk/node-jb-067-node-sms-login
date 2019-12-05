const dal = require('./dal');

function compareLogin(sms, callback) {
    let query = `SELECT * FROM user WHERE otp LIKE '${sms}'`;
    dal.compare(query, function (err, _user) {
        if (err) {
            callback(err);
        } else {
            callback(null, _user);
        }
    })
}

module.exports.compareLogin = compareLogin;