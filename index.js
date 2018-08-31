const express = require('express');
const server = express();
const middleware = require('./data/config/middleware');
const actionsRoutes = require('./data/actions/actionsRouter');
const projectRoutes = require('./data/projects/projectRouter');

middleware(server);
server.use('/projects', projectRoutes);
server.use('/actions', actionsRoutes);


server.listen(6000);