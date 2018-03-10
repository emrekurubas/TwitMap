var fs = require("fs");
var path = require('path');

function view(templateName, response) {
    var contentType = 'text/html';
    var extname = path.extname(templateName);
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }
    
    fs.readFile(templateName, function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end('Sorry, content cannot be loaded, error code: ' + error.code + '\n');
            response.end(); 
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

module.exports.view = view;