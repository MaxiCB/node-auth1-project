const express = require('express');
const session = require('express-session');

const UserRoute = require("./users/user-route");

const server = express();

server.use(express.json());

server.use(
    session({
        name: 'usersession',
        secret: 'test secret',
        cookie: {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            secure: true
        },
        httpOnly: true,
        resave: false,
        saveUninitialized: false,
    })
)

server.use('/api/users', UserRoute);
server.use('/api/restricted', UserRoute);

module.exports = server;