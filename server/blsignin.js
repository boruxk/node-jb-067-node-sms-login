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
        length: 5,
        numbers: true
    });
    let query = `UPDATE user SET otp = '${password}' WHERE phone LIKE '${phone}'`;
    dal.updateOne(query, function (err, result) {
        if (err) {
            callback(err);
        } else {
            let xmlpost = `<Inforu>
                                <User>
                                    <Username>MyUsername</Username>
                                    <Password>MyPassword</Password>
                                </User>
                                <ContentType="sms">
                                    <Message>${password}</Message>
                                </Content>
                                <Recipients>
                                    <PhoneNumber>${phone}</PhoneNumber>
                                </Recipients>
                                <Settings>
                                    <Sender>${phone}</Sender>
                                </Settings>
                            </Inforu>`;
            fetch('http://uapi.mesergo.co.il/SendMessageXml.ashx?InforuXML={xml}', {
                method: 'POST',
                body: xmlpost,
                headers: {
                    'Content-Type': 'text/xml'
                }
            });
            result.password = password;
            callback(null, result);
        }
    })
}

module.exports.compareSignin = compareSignin;