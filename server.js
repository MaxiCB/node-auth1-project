const express = require('express');

const UserRoute = require("./users/user-route");

const server = express();

server.use(express.json());

server.use('/api/users', UserRoute);

module.exports = server;