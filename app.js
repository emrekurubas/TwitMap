const http = require('http');
const router = require('./router.js');

const port = 3001;

const server = http.createServer((request, response) => {
    router.home(request, response);
}).listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});