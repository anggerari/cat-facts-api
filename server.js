import app from './index.js';
import config from "./config.js";
import http from "http";
const port = config.service.port || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log("server starting on port 3000!"));
