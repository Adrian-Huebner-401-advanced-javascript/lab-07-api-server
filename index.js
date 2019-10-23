'use strict';

const server = require('./lib/server');

let PORT = process.env.PORT || 8080;
server.start(PORT);