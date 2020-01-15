const express = require('express');

const UserRoute = require("./users/user-route");

const server = express();

server.use(express.json());

server.use('/api/users', UserRoute);
server.use('/api/restricted', UserRoute);

module.exports = server;