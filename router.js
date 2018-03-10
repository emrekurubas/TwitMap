var render = require("./render");

function home(request, response) {
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './view/map.html';

    render.view(filePath, response);
}

module.exports.home = home;

