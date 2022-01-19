import express from 'express';
import bodyParser from 'body-parser';
import config from './config.js';
import http from "http";
import logger from 'morgan';
import cors from 'cors'

// routes
import routes from './routes/index.js';

const port = config.service.port || 3000;


// Set up the express app
const app = express();
const server = http.createServer(app);

// morgan log
app.use(logger('dev'));

// Enable Cross Origin Resource Sharing by default
app.use(cors())

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
app.use('/', routes);


// Server listen to port
server.listen(port);
export default app;