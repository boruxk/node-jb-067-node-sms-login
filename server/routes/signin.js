const express = require('express');
const router = express.Router();
const bl = require('../blsignin');
const jwt = require('jsonwebtoken');
const SEKRET_KEY_JWT = "4rfu40rjf48urnf34u40fu8j04fj34fu9r4jnu94";

router.post("/", function (req, res) {
    let { phone } = req.body;
    bl.compareSignin(phone, function (e, result) {
        if (e) {
            return res.status(500).send();
        } else {
            const token = jwt.sign({
                phone: phone,
            }, SEKRET_KEY_JWT,
                {
                    expiresIn: 100000
            });
            return res.status(202).send(token);
        }
    })
})

module.exports = router;