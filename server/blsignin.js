const dal = require('./dal');
var generator = require('generate-password');
const fetch = require('node-fetch');

function compareSignin(phone, callback) {
    let query = `SELECT * FROM user WHERE phone LIKE '${phone}'`;
    dal.compare(query, function (err, _user) {
        if (err) {
            callback(err);
        } else {
            createOTP(phone, callback);
        }
    })
}

function createOTP(phone, callback) {
    var password = generator.generate({
        length: 10,
        numbers: true
    });
    let query = `UPDATE user SET otp = '${password}' WHERE phone LIKE '${phone}'`;
    dal.updateOne(query, function (err, result) {
        if (err) {
            callback(err);
        } else {
            let xmlpost = `<Inforu><User><Username>kobieshka</Username><Password>qqQQ11!!</Password></User><Content Type="sms"><Message>${password}</Message></Content><Recipients><PhoneNumber>${phone}</PhoneNumber></Recipients><Settings><Sender>0547974202</Sender></Settings></Inforu>`;
            console.log(xmlpost)
            fetch(`http://uapi.mesergo.co.il/SendMessageXml.ashx?InforuXML=${xmlpost}`, {
                method: 'POST'
            }).then(data => {
                console.log(data);
                
                data.text().then(xmlRes => console.log(xmlRes));
            });
            result.password = password;
            callback(null, result);
        }
    })
}

module.exports.compareSignin = compareSignin;