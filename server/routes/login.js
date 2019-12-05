const express = require('express');
const router = express.Router();
const bl = require('../bllogin');
const jwt = require('jsonwebtoken');
const SEKRET_KEY_JWT = "4rfu40rjf48urnf34u40fu8j04fj34fu9r4jnu94";

router.post("/", function (req, res) {
    let { smscode } = req.body;
    bl.compareLogin(smscode, function (e, _user) {
        if (e) {
            return res.status(500).send();
        } else {
            if (_user === "error") {
                return res.status(401).send();
            } else {
                return res.status(202).send(_user);
            }
        }
    })
})

module.exports = router;