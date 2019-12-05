const mysql = require('mysql');

function compare(query, callback) {
    //login check
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'smslogin'
    });
    db.connect((err) => {
        if (err) throw err;
        db.query(query, (err, result) => {
            if (err || result.length === 0) { callback(null, "error");}
            else {
                callback(null, result);
            }
            db.end();
        });
    });
}

function updateOne(query, callback) {
    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'smslogin'
    });
    db.connect((err) => {
        if (err) throw err;
        db.query(query, (err, result) => {
            if (err) { callback('error'); }
            else { callback(null, result); }
            db.end();
        });
    });
}

module.exports.compare = compare;
module.exports.updateOne = updateOne;
