const express = require('express');
// const projectRouter = require('../data/routers/project-router.js');
// const actionRouter = require('../data/routers/action-router.js');

const server = express();

server.use(express.json());

// server.use('/api/projects', projectRouter);
// server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send("Good morning, how may I serve you today?")
});

module.exports = server;