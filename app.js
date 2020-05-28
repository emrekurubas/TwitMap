const http = require('http');
const router = require('./router.js');
const websocket = require('./websocket.js');

const port = 3001;

// -------------- WEB SOCKET ---------------------

websocket.start();

// -------------- WEB SERVER ---------------------

const server = http.createServer((request, response) => {
    router.home(request, response);
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});