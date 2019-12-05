const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const SEKRET_KEY_JWT = "4rfu40rjf48urnf34u40fu8j04fj34fu9r4jnu94";
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 3202;
app.use(bodyParser.json());

//check token before render 
app.use(function (req, res, next) {
    if (req.method === 'POST' && req.path === '/signin' || req.method === 'POST' && req.path === '/login') {
        next();
    } else {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            try {
                const a = jwt.verify(token, SEKRET_KEY_JWT);
                next();
            } catch (ex) {
                res.status(401).send();
            }
        } else {
            res.status(401).send();
        }
    }
})

const signin = require('./routes/signin');
const login = require('./routes/login');
//const member = require('./routes/member');
app.use('/signin', signin);
app.use('/login', login);
//app.use('/member', member);

app.listen(process.env.PORT || PORT, () =>
    console.log(`App listening on port ${PORT}!`),
);